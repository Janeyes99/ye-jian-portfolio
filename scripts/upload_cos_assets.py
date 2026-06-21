#!/usr/bin/env python3
import argparse
import mimetypes
import os
import sys
from pathlib import Path


BUCKET = "yejian-portfolio-assets-1445614055"
REGION = "ap-hongkong"
DEFAULT_PREFIX = "portfolio"


def require_env(name):
    value = os.environ.get(name)
    if not value:
        print(f"Missing environment variable: {name}", file=sys.stderr)
        sys.exit(2)
    return value


def iter_files(root):
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.name != ".DS_Store":
            yield path


def main():
    parser = argparse.ArgumentParser(
        description="Upload portfolio media to Tencent Cloud COS."
    )
    parser.add_argument(
        "source",
        nargs="?",
        default="../../outputs/cos-upload/portfolio",
        help="Local portfolio asset folder to upload.",
    )
    parser.add_argument(
        "--prefix",
        default=DEFAULT_PREFIX,
        help="COS key prefix. Default: portfolio",
    )
    parser.add_argument("--bucket", default=BUCKET)
    parser.add_argument("--region", default=REGION)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned uploads without sending files.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Upload every file without checking whether it already exists.",
    )
    args = parser.parse_args()

    source = Path(args.source).expanduser().resolve()
    if not source.is_dir():
        print(f"Source folder not found: {source}", file=sys.stderr)
        sys.exit(2)

    files = list(iter_files(source))
    print(f"Source: {source}")
    print(f"Bucket: {args.bucket}")
    print(f"Region: {args.region}")
    print(f"Prefix: {args.prefix.strip('/')}/")
    print(f"Files: {len(files)}")

    if args.dry_run:
        for file_path in files:
            key = f"{args.prefix.strip('/')}/{file_path.relative_to(source).as_posix()}"
            print(key)
        return

    try:
        from qcloud_cos import CosConfig, CosS3Client
    except ImportError:
        print(
            "Missing dependency: qcloud_cos. Run: python3 -m pip install cos-python-sdk-v5",
            file=sys.stderr,
        )
        sys.exit(2)

    config = CosConfig(
        Region=args.region,
        SecretId=require_env("TENCENTCLOUD_SECRET_ID"),
        SecretKey=require_env("TENCENTCLOUD_SECRET_KEY"),
        Token=os.environ.get("TENCENTCLOUD_TOKEN"),
    )
    client = CosS3Client(config)

    for index, file_path in enumerate(files, 1):
        key = f"{args.prefix.strip('/')}/{file_path.relative_to(source).as_posix()}"
        content_type = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"
        if not args.force:
            try:
                existing = client.head_object(Bucket=args.bucket, Key=key)
                if int(existing.get("Content-Length", -1)) == file_path.stat().st_size:
                    print(f"[{index}/{len(files)}] skip {key}", flush=True)
                    continue
            except Exception:
                pass

        print(f"[{index}/{len(files)}] {key}", flush=True)
        client.upload_file(
            Bucket=args.bucket,
            LocalFilePath=str(file_path),
            Key=key,
            PartSize=10,
            MAXThread=8,
            EnableMD5=False,
            ContentType=content_type,
        )

    print("Upload complete.")


if __name__ == "__main__":
    main()
