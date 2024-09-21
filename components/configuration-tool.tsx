"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/custom-ui/scroll-area";
import { baseTheme } from "@/config";
import { hexToHSL, hslToHex } from "@/lib/color";
import ColorSwatch from "./custom-ui/color-swatch";

export function ConfigurationTool() {
  const [appTheme, setAppTheme] = useState<ColorTheme>(baseTheme);

  function handleChange(cssVar: string, hex: string) {
    const newAppTheme = structuredClone(appTheme);
    let hexVal = hexToHSL(hex);
    if (!hexVal) {
      alert("Invalid color");
      return;
    }
    newAppTheme[cssVar] = `${hexVal.h} ${hexVal.s}% ${hexVal.l}%`;
    // document.documentElement.style.setProperty(cssVar, newAppTheme[cssVar]);
    (document.querySelector("#preview") as HTMLElement).style.setProperty(
      cssVar,
      newAppTheme[cssVar]
    );
    setAppTheme(newAppTheme);
  }

  return (
    <div className="min-w-64 h-screen bg-background border-r w-64">
      <div className="border-b flex justify-between items-center">
        {/* <h2 className="text-lg font-semibold">Color Picker</h2> */}
      </div>
      <ScrollArea className="h-[calc(100vh-116px)]">
        <div className={`grid grid-cols-3`}>
          {Object.entries(appTheme).map(([key, value]) => (
            <ColorSwatch
              className="col-span-1 w-full relative"
              handleChange={handleChange}
              label={key}
              color={hslToHex(value)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
