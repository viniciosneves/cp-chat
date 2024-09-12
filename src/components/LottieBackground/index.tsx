'use client'

import Lottie from "lottie-react";
import backgroundAnimation from "./landing.json";

export default function LottieBackground() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: -1 }}>
      <Lottie
        animationData={backgroundAnimation}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}