"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/custom-ui/scroll-area";
import { hexToHSL, hslToHex } from "@/lib/color";
import ColorSwatch from "./custom-ui/color-swatch";
import useThemeConfig from "@/hooks/use-theme-config";
import { useTheme } from "next-themes";
import ControlPanel from "./control-panel";
import { Popover, PopoverContent } from "./custom-ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./custom-ui/button";
import { Cog, SlidersVertical } from "lucide-react";
import { getColorPairs, getSingleColors } from "@/lib/utils";
import GenerateCodeButton from "./generate-code-button";

export function ConfigurationTool() {
  const { themeConfig, setThemeConfig, reset } = useThemeConfig();
  const { theme } = useTheme();
  const colorPairs = getColorPairs(
    theme === "dark" ? themeConfig.dark : themeConfig.light
  );
  const colorSingles = getSingleColors(
    theme === "dark" ? themeConfig.dark : themeConfig.light
  );

  useEffect(() => {
    let elem = document.querySelector("#preview") as HTMLDivElement;
    if (theme === "light" || theme === undefined) {
      Object.entries(themeConfig.light).forEach(([key, value]) =>
        elem.style.setProperty(key, value)
      );
    } else {
      Object.entries(themeConfig.dark).forEach(([key, value]) =>
        elem.style.setProperty(key, value)
      );
    }
  }, [themeConfig, theme]);

  function handleChange(cssVar: ThemeProperty, hex: string) {
    const newAppTheme = structuredClone(themeConfig);
    let hexVal = hexToHSL(hex);
    if (!hexVal) {
      alert("Invalid color");
      return;
    }
    if (theme === "dark") {
      newAppTheme.dark[cssVar] = `${hexVal.h} ${hexVal.s}% ${hexVal.l}%`;
    } else {
      newAppTheme.light[cssVar] = `${hexVal.h} ${hexVal.s}% ${hexVal.l}%`;
    }
    setThemeConfig(newAppTheme);
  }

  return (
    <div className="fixed bottom-7 left-7">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
            <SlidersVertical className="size-4 mr-2" />
            Customize
          </Button>
        </PopoverTrigger>
        <PopoverContent className="light">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Customize theme</h2>
            </div>
            <div className="flex space-x-3 divide-x">
              <div className="grid grid-cols-3 gap-4 mb-4 justify-center text-sm">
                <div className="col-span-1"></div>
                <div className="font-medium text-center">Background</div>
                <div className="font-medium text-center">Foreground</div>
                {colorPairs.map((pair, index) => (
                  <>
                    <div
                      key={`label-${index}`}
                      className="font-medium text-sm mt-2"
                    >
                      {pair.label}
                    </div>
                    <ColorSwatch
                      className="w-12 aspect-[1.2] rounded-md self-center ml-4"
                      handleChange={handleChange}
                      color={hslToHex(pair.background)}
                      label={pair.cssVariable}
                    />
                    <ColorSwatch
                      className="w-12 aspect-[1.2] rounded-md ml-4"
                      handleChange={handleChange}
                      color={hslToHex(pair.foreground)}
                      label={
                        pair.cssVariable.concat("--foreground") as ThemeProperty
                      }
                    />
                  </>
                ))}
              </div>
              <div className="grid gap-4 mb-4 justify-center text-sm pl-4">
                <div className="grid grid-cols-2 gap-4 gap-x-10 h-fit">
                  <div className="col-span-2 font-medium text-left">
                    Other properties
                  </div>
                  {colorSingles.slice(0, 3).map((obj, index) => (
                    <div
                      key={obj.cssVariable}
                      className="flex justify-between gap-4 pl-4"
                    >
                      <div
                        key={`label-${index}`}
                        className="font-medium text-sm mt-2"
                      >
                        {obj.label}
                      </div>
                      <ColorSwatch
                        className="w-12 aspect-[1.2] rounded-md ml-4"
                        handleChange={handleChange}
                        color={hslToHex(obj.value)}
                        label={obj.cssVariable}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 gap-x-10 h-fit">
                  <div className="col-span-2 font-medium text-left">Charts</div>
                  {true ? (
                    <p className="text text-gray-500">Coming soon</p>
                  ) : (
                    colorSingles.slice(3).map((obj, index) => (
                      <div
                        key={obj.cssVariable}
                        className="flex justify-between gap-4 pl-4"
                      >
                        <div
                          key={`label-${index}`}
                          className="font-medium text-sm mt-2"
                        >
                          {obj.label}
                        </div>
                        <ColorSwatch
                          className="w-12 aspect-[1.2] rounded-md ml-4"
                          handleChange={handleChange}
                          color={hslToHex(obj.value)}
                          label={obj.cssVariable}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2 justify-end mt-10">
              <Button variant="outline" className="mb-2" onClick={reset}>
                Reset
              </Button>
              <GenerateCodeButton />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="min-w-64 h-screen border-r w-64 flex flex-col absolute">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Control panel</h2>
      </div>
      <ScrollArea className="h-full flex-1">
        <div className={`grid grid-cols-3`}>
          {Object.entries(
            theme === "light" || theme === undefined
              ? themeConfig.light
              : themeConfig.dark
          ).map(([key, value]) => (
            <ColorSwatch
              key={key}
              className="col-span-1 w-full relative"
              handleChange={handleChange}
              label={key as ThemeProperty}
              color={hslToHex(value)}
            />
          ))}
        </div>
      </ScrollArea>
      <ControlPanel />
    </div>
  );
}
