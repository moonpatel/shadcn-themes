"use client";

import { Input } from "@/components/custom-ui/input";
import React, { useEffect, useState } from "react";

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  handleChange: (key: ThemeProperty, val: string) => void;
  label: ThemeProperty;
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
        fieldsize={"colorswatch"}
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          handleChange(label, newColor);
        }}
        className="p-0 shadow-lg rounded-md absolute opacity-0"
      />
      <div
        className="aspect-[1.3] shadow-lg rounded-md"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ColorSwatch;
