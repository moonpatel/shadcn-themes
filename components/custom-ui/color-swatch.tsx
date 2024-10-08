"use client";

import { Input } from "@/components/custom-ui/input";
import React, { useEffect, useState } from "react";

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  handleChange: (key: string, val: string) => void;
  label: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color: initialColor,
  handleChange,
  label,
  ...props
}) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  return (
    <div {...props}>
      <Input
        type="color"
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          handleChange(label, newColor);
        }}
        className="p-0 shadow-lg size-full rounded-none absolute opacity-0"
      />
      <div
        className="aspect-[1.3] shadow-lg"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ColorSwatch;
