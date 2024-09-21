"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaletteIcon } from "lucide-react";

export default function ColorField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="color-input">{label}</Label>
        <div className="flex space-x-2">
          <Input
            id="color-input"
            type="text"
            value={value}
            onChange={handleColorChange}
            className="flex-grow"
          />
          <div>
            <input
              id="color-picker"
              type="color"
              value={value}
              onChange={handleColorChange}
              className="h-10 w-10 cursor-pointer rounded-full appearance-none bg-transparent border-transparent p-0"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="h-10 w-10 rounded-full border"
          style={{ backgroundColor: color }}
          aria-label={`Selected color: ${color}`}
        />
        <span>Selected Color: {color}</span>
      </div>
    </div>
  );
}
