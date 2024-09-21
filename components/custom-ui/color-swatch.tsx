import { Input } from "@/components/custom-ui/input";
import React from "react";

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  handleChange: (key: string, val: string) => void;
  label: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  handleChange,
  label,
  ...props
}) => {
  return (
    <div {...props}>
      <Input
        type="color"
        value={color}
        onChange={(e) => handleChange(label, e.target.value)}
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
