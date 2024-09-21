"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/custom-ui/label";
import { Button } from "@/components/custom-ui/button";
import { ScrollArea } from "@/components/custom-ui/scroll-area";
import { baseTheme } from "@/config";
import { hexToHSL, hslToHex } from "@/lib/color";
import ColorSwatch from "./custom-ui/color-swatch";

export function ConfigurationTool() {
  const [appTheme, setAppTheme] = useState<ColorTheme>(baseTheme);
  const [showLabels, setShowLabels] = useState(true);
  console.log(document.documentElement.style.getPropertyValue("--background"));

  const toggleLabels = () => setShowLabels(!showLabels);

  // useEffect(() => {
  //   Object.entries(appTheme).forEach(([key, value]) => {
  //     // let elem = document.querySelector("#preview");
  //     // elem?.computedStyleMap();
  //     document.documentElement.style.setProperty(key, value);
  //     console.log(key, value);
  //   });
  // }, [appTheme]);

  function handleChange(cssVar: string, hex: string) {
    const newAppTheme = structuredClone(appTheme);
    let hexVal = hexToHSL(hex);
    if (!hexVal) {
      alert("Invalid color");
      return;
    }
    newAppTheme[cssVar] = `${hexVal.h} ${hexVal.s}% ${hexVal.l}%`;
    document.documentElement.style.setProperty(cssVar, newAppTheme[cssVar]);
    (document.querySelector("#preview") as HTMLElement).style.setProperty(
      cssVar,
      newAppTheme[cssVar]
    );
    setAppTheme(newAppTheme);
  }

  return (
    <div className="min-w-64 h-screen bg-background border-r w-64">
      {/* <div className="fixed top-4 right-4 bg-gray-900 text-white z-50 p-2 rounded shadow">
        <p
          className="text-xs font-mono font-semibold"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(appTheme, null, 2)
              .replaceAll("\n", "<br/>")
              .replaceAll(" ", "&nbsp;"),
          }}
        ></p>
      </div> */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Color Picker</h2>
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={toggleLabels}>
            {showLabels ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-116px)]">
        <div className={`p-4 grid grid-cols-3`}>
          {showLabels
            ? Object.entries(appTheme).map(([key, value]) => (
                <div
                  key={key}
                  className={`space-y-2 my-3 flex items-center flex-row-reverse  space-x-3 ${"justify-end col-span-3"}`}
                >
                  <div className="pl-3">
                    <Label htmlFor={`color-${key}`}>{key.slice(2)}</Label>
                  </div>
                  <div
                    className={`flex space-x-2 justify-center items-center ${"col-span-3"}`}
                  >
                    <ColorSwatch
                      onChange={handleChange}
                      label={key}
                      color={hslToHex(value)}
                    />
                  </div>
                </div>
              ))
            : Object.entries(appTheme).map(([key, value]) => (
                <div
                  key={key}
                  className={`space-y-2 my-3 flex items-center flex-row-reverse  space-x-3 ${"justify-center col-span-1"}`}
                >
                  <div
                    className={`flex space-x-2 justify-center items-center ${"col-span-1"}`}
                  >
                    <div className="pl-3">
                      <ColorSwatch
                        onChange={handleChange}
                        label={key}
                        color={hslToHex(value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </ScrollArea>
    </div>
  );
}
