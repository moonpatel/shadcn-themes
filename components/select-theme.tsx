import getColorPalette from "@/lib/utils";
import { hslToHex } from "@/lib/color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./custom-ui/dropdown-menu";
import { Button } from "./custom-ui/button";
import { useTheme } from "next-themes";
import { Trash2 } from "lucide-react";
import SaveThemeButton from "./add-theme";
import { useThemeConfiguration } from "@/app/context/theme-config-provider";

export default function SelectTheme() {
  const { savedThemes, themeConfig, selectTheme, deleteTheme } =
    useThemeConfiguration();
  const { theme } = useTheme();
  const customThemes = savedThemes.filter((theme) => !theme.default);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel className="flex justify-between">
          Default Themes
          <SaveThemeButton />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {savedThemes.map((savedTheme, idx) =>
            !savedTheme.default ? (
              <></>
            ) : (
              <DropdownMenuItem
                key={savedTheme.name}
                onClick={() => selectTheme(idx)}
                className={`justify-between ${
                  themeConfig.name === savedTheme.name &&
                  "bg-black/10 dark:bg-white/10"
                }`}
              >
                <div className="truncate">{savedTheme.name}</div>
                <div className="flex shadow-md">
                  {getColorPalette(
                    savedTheme,
                    theme === "dark" ? "dark" : "light"
                  ).map((color, i) => (
                    <div
                      key={i}
                      className={`size-5 ${i === 0 && "rounded-l-md"} ${
                        i === savedThemes.length && "rounded-r-md"
                      }`}
                      style={{ backgroundColor: hslToHex(color!) }}
                    ></div>
                  ))}
                </div>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>
        {customThemes.length > 0 && (
          <>
            <DropdownMenuLabel>Custom Themes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {savedThemes.map((savedTheme, idx) =>
                savedTheme.default ? (
                  <></>
                ) : (
                  <DropdownMenuItem
                    key={savedTheme.name}
                    onClick={() => selectTheme(idx)}
                    className={`justify-between ${
                      themeConfig.name === savedTheme.name &&
                      "bg-black/10 dark:bg-white/10"
                    }`}
                  >
                    <div className="flex justify-between w-full">
                      <div className="truncate w-full">{savedTheme.name}</div>
                      <div className="flex shadow-md w-fit">
                        {getColorPalette(
                          savedTheme,
                          theme === "dark" ? "dark" : "light"
                        ).map((color, i) => (
                          <div
                            key={i}
                            className={`size-5 ${i === 0 && "rounded-l-md"} ${
                              i === 4 && "rounded-r-md"
                            }`}
                            style={{ backgroundColor: hslToHex(color!) }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* <div className="flex w-fit items-center justify-end ml-3 pl-3 gap-2 border-l">
                      <Trash2
                        className="size-[18px] cursor-pointer"
                        onClick={() => deleteTheme(idx)}
                      />
                    </div> */}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
