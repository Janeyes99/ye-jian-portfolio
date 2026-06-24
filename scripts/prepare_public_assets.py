#!/usr/bin/env python3
import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
COPY_EXTS = {".gif", ".mp4", ".mov", ".m4v", ".svg", ".mp3", ".pdf"}


def find_font(size):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size=size)
        except Exception:
            pass
    return ImageFont.load_default()


def target_size(width, height, max_edge, max_width, max_height):
    ratio = max(width, height) / max(1, min(width, height))
    if ratio >= 3:
        scale = min(1.0, max_width / width, max_height / height)
    else:
        scale = min(1.0, max_edge / max(width, height))
    return max(1, round(width * scale)), max(1, round(height * scale))


def add_corner_signature(image, text):
    if not text:
        return image

    base = image.convert("RGBA")
    width, height = base.size
    short_edge = min(width, height)
    font_size = max(18, min(54, round(short_edge * 0.026)))
    pad = max(18, round(short_edge * 0.025))
    radius = max(10, round(font_size * 0.55))
    font = find_font(font_size)

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    box = draw.textbbox((0, 0), text, font=font)
    text_w = box[2] - box[0]
    text_h = box[3] - box[1]
    x = width - text_w - pad * 2
    y = height - text_h - pad * 2
    bg_box = (x - pad * 0.45, y - pad * 0.35, width - pad, height - pad)

    draw.rounded_rectangle(bg_box, radius=radius, fill=(255, 255, 255, 34))
    draw.text((x, y), text, fill=(255, 255, 255, 72), font=font)
    draw.text((x + 1, y + 1), text, fill=(0, 0, 0, 42), font=font)
    return Image.alpha_composite(base, layer)


def process_image(src, dst, args):
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        original_mode = im.mode
        if args.resize_display_assets:
            next_w, next_h = target_size(
                im.width,
                im.height,
                args.max_edge,
                args.max_width,
                args.max_height,
            )
            if (next_w, next_h) != im.size:
                im = im.resize((next_w, next_h), Image.Resampling.LANCZOS)

        im = add_corner_signature(im, args.signature)
        dst.parent.mkdir(parents=True, exist_ok=True)

        suffix = dst.suffix.lower()
        if suffix in {".jpg", ".jpeg"}:
            im = im.convert("RGB")
            im.save(dst, quality=args.jpeg_quality, optimize=True, progressive=True)
        elif suffix == ".webp":
            im.save(dst, quality=args.webp_quality, method=6)
        else:
            if original_mode not in {"RGBA", "LA"}:
                im = im.convert("RGB")
            im.save(dst, optimize=True)


def copy_file(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def iter_files(root):
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.name != ".DS_Store":
            yield path


def main():
    parser = argparse.ArgumentParser(
        description="Create public display assets without changing aspect ratios."
    )
    parser.add_argument(
        "source",
        nargs="?",
        default="../../outputs/cos-upload/portfolio",
        help="Source asset folder.",
    )
    parser.add_argument(
        "--output",
        default="../../outputs/cos-upload/portfolio-public",
        help="Output folder for public display assets.",
    )
    parser.add_argument("--max-edge", type=int, default=3000)
    parser.add_argument("--max-width", type=int, default=3000)
    parser.add_argument("--max-height", type=int, default=12000)
    parser.add_argument("--jpeg-quality", type=int, default=94)
    parser.add_argument("--webp-quality", type=int, default=94)
    parser.add_argument("--signature", default="Ye Jian Design")
    parser.add_argument(
        "--resize-display-assets",
        action="store_true",
        help="Optionally downscale oversized images while preserving aspect ratio. Disabled by default.",
    )
    args = parser.parse_args()

    source = Path(args.source).expanduser().resolve()
    output = Path(args.output).expanduser().resolve()
    if not source.is_dir():
        raise SystemExit(f"Source folder not found: {source}")

    image_count = 0
    copied_count = 0
    skipped_count = 0
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True, exist_ok=True)

    for src in iter_files(source):
        rel = src.relative_to(source)
        dst = output / rel
        suffix = src.suffix.lower()
        if suffix in IMAGE_EXTS:
            process_image(src, dst, args)
            image_count += 1
        elif suffix in COPY_EXTS:
            copy_file(src, dst)
            copied_count += 1
        else:
            skipped_count += 1
            print(f"skip unsupported: {rel}")

    print(f"Source: {source}")
    print(f"Output: {output}")
    print(f"Images processed: {image_count}")
    print(f"Files copied unchanged: {copied_count}")
    print(f"Skipped: {skipped_count}")


if __name__ == "__main__":
    main()
