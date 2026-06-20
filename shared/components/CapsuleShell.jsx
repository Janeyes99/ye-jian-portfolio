// CapsuleShell Component

import React from 'react';

var CapsuleShell = ({
  color,
  payloadGradient,
  payloadDot,
  rot = 0,
  variant = 0,
  forceDomePayload = false
}) => {
  const payload = capsulePayloads[variant % capsulePayloads.length];
  const fillGradient = payloadGradient || payload.blob.background;
  const fillDot = payloadDot || payload.dot.background;
  const payloadBlobStyle = {
    ...payload.blob,
    background: fillGradient
  };
  const payloadDotStyle = {
    ...payload.dot,
    background: fillDot
  };
  const domePayloadStyle = {
    left: "16%",
    top: "8%",
    width: "68%",
    height: "76%",
    background: fillGradient,
    borderRadius: payload.blob.borderRadius,
    transform: (payload.blob.transform || "") + " scale(1.06)"
  };
  const domeDotStyle = {
    left: payload.dot.left,
    top: "44%",
    width: "14%",
    height: "14%",
    background: fillDot
  };
  const upperMask = {
    WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 58%, transparent 59%)",
    maskImage: "linear-gradient(to bottom, #000 0%, #000 58%, transparent 59%)"
  };
  const upperSpeckleStyle = {
    ...upperMask,
    backgroundImage: "radial-gradient(circle at 22% 35%, rgba(255,255,255,0.42) 0 1px, transparent 1.8px), radial-gradient(circle at 68% 28%, rgba(255,255,255,0.24) 0 0.8px, transparent 1.6px)",
    backgroundSize: "8px 8px, 11px 11px"
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative w-full h-full rounded-full overflow-hidden bg-sky-50/10 shadow-[inset_-4px_-7px_10px_rgba(0,0,0,0.23),0_7px_14px_rgba(63,63,70,0.18)]",
    style: {
      transform: "rotate(" + rot + "deg)"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-[1] rounded-full bg-gradient-to-br from-white/64 via-white/32 to-slate-100/18"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute z-[8] opacity-64 blur-[3px] shadow-[0_5px_12px_rgba(99,102,241,0.10)]",
    style: payloadBlobStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute z-[9] rounded-full opacity-36 blur-[2.8px]",
    style: payloadDotStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-[18] rounded-full overflow-hidden pointer-events-none"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full",
    style: upperMask
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute opacity-[0.44] blur-[4.5px] saturate-110",
    style: domePayloadStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute rounded-full opacity-[0.24] blur-[4px]",
    style: domeDotStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full bg-white/44 shadow-[inset_0_-6px_14px_rgba(255,255,255,0.52)]"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-x-0 bottom-0 z-10 h-[52%] " + color + " shadow-[inset_-4px_-6px_10px_rgba(0,0,0,0.32)]"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-20 rounded-full overflow-hidden pointer-events-none"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full border border-white/78 bg-gradient-to-br from-white/76 via-white/54 to-slate-100/30 shadow-[inset_3px_6px_12px_rgba(255,255,255,0.92),inset_-5px_-7px_12px_rgba(100,116,139,0.12),0_2px_5px_rgba(100,116,139,0.10)]",
    style: upperMask
  })), forceDomePayload && /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 z-[23] rounded-full overflow-hidden pointer-events-none",
    style: upperMask
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute opacity-[0.68] blur-[3.6px] saturate-125",
    style: domePayloadStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute rounded-full opacity-[0.42] blur-[2.8px]",
    style: domeDotStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-0 rounded-full bg-white/8"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-[4%] z-[24] rounded-full opacity-18 pointer-events-none",
    style: upperSpeckleStyle
  }));
}

export default CapsuleShell;
