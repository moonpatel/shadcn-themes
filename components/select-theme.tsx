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
          {savedThemes.map((savedTheme, idx) => {
            const colorPalette = getColorPalette(
              savedTheme,
              theme === "dark" ? "dark" : "light"
            );
            return !savedTheme.default ? (
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
                  {colorPalette.map((color, i) => (
                    <div
                      key={i}
                      className={`size-5 ${i === 0 && "rounded-l-md"} ${
                        i === colorPalette.length - 1 && "rounded-r-md"
                      }`}
                      style={{ backgroundColor: hslToHex(color!) }}
                    ></div>
                  ))}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        {customThemes.length > 0 && (
          <>
            <DropdownMenuLabel className="mt-3">Custom Themes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {savedThemes.map((savedTheme, idx) => {
                const colorPalette = getColorPalette(
                  savedTheme,
                  theme === "dark" ? "dark" : "light"
                );
                console.log(colorPalette.length);
                return savedTheme.default ? (
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
                        {colorPalette.map((color, i) => {
                          console.log(i);
                          return (
                            <div
                              key={i}
                              className={`size-5 ${i === 0 && "rounded-l-md"} ${
                                i === colorPalette.length - 1 && "rounded-r-md"
                              }`}
                              style={{ backgroundColor: hslToHex(color!) }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>

                    {/* <div className="flex w-fit items-center justify-end ml-3 pl-3 gap-2 border-l">
                      <Trash2
                      className="size-[18px] cursor-pointer"
                      onClick={() => deleteTheme(idx)}
                      />
                      </div> */}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
