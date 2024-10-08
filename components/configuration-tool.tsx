"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/custom-ui/scroll-area";
import { hexToHSL, hslToHex } from "@/lib/color";
import ColorSwatch from "./custom-ui/color-swatch";
import GenerateCodeButton from "./generate-code-button";
import useThemeConfig from "@/hooks/use-theme-config";
import { useTheme } from "next-themes";
import ControlPanel from "./control-panel";

export function ConfigurationTool() {
  const { themeConfig, setThemeConfig } = useThemeConfig();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let elem = document.querySelector("#preview") as HTMLDivElement;
    if (theme === "light")
      Object.entries(themeConfig.light).forEach(([key, value]) =>
        (document.querySelector("#preview") as HTMLDivElement).style.setProperty(key, value)
      );
    else
      Object.entries(themeConfig.dark).forEach(([key, value]) =>
        elem.style.setProperty(key, value)
      );
  }, [themeConfig, theme]);

  function handleChange(cssVar: string, hex: string) {
    const newAppTheme = structuredClone(themeConfig);
    let hexVal = hexToHSL(hex);
    if (!hexVal) {
      alert("Invalid color");
      return;
    }
    if (theme === "light") {
      newAppTheme.light[cssVar] = `${hexVal.h} ${hexVal.s}% ${hexVal.l}%`;
    } else {
      newAppTheme.dark[cssVar] = `${hexVal.h} ${hexVal.s}% ${hexVal.l}%`;
    }
    setThemeConfig(newAppTheme);
  }

  return (
    <div className="min-w-64 h-screen border-r w-64 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Control panel</h2>
      </div>
      <ScrollArea className="h-full flex-1">
        <div className={`grid grid-cols-3`}>
          {Object.entries(
            theme === "light" ? themeConfig.light : themeConfig.dark
          ).map(([key, value]) => (
            <ColorSwatch
              key={key}
              className="col-span-1 w-full relative"
              handleChange={handleChange}
              label={key}
              color={hslToHex(value)}
            />
          ))}
        </div>
      </ScrollArea>
      <ControlPanel />
    </div>
  );
}
