import React from "react";

type MovingTextStripProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  speed?: "verySlow" | "slow" | "medium" | "fast";
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

export default function MovingTextStrip({
  text,
  bgColor = "#DDF695",
  textColor = "#171817",
  speed = "medium",
  fontSize = "xl",
}: MovingTextStripProps) {
  // Duplicate the text to ensure continuous flow
  const repeatedText = `${text}       ${text}      ${text}         ${text}         ${text}         ${text}`;

  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case "verySlow":
        return "150s";
      case "slow":
        return "30s";
      case "fast":
        return "15s";
      default:
        return "20s";
    }
  };
  // console.log(repeatedText);

  // Determine font size class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      case "5xl":
        return "text-5xl";
      case "6xl":
        return "text-6xl";
      default:
        return "text-xl";
    }
  };

  return (
    <div
      className="overflow-hidden py-20 whitespace-nowrap"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`inline-block animate-marquee ${getFontSizeClass()} font-montserrat font-bold tracking-wide uppercase [word-spacing:5em]`}
        style={{
          animationDuration: getDuration(),
          color: textColor,
        }}
      >
        {repeatedText}
      </div>
    </div>
  );
}
