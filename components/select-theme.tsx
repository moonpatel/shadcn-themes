import useThemeConfig from "@/hooks/use-theme-config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./custom-ui/select";
import getColorPalette from "@/lib/utils";
import { hslToHex } from "@/lib/color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./custom-ui/dropdown-menu";
import { Button } from "./custom-ui/button";

export default function SelectTheme() {
  const { savedThemes, changeTheme, themeConfig } = useThemeConfig();
  console.log(themeConfig.name);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Themes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={themeConfig.name}
          onValueChange={changeTheme}
        >
          {savedThemes.map((savedTheme) => (
            <DropdownMenuRadioItem
              key={savedTheme.name}
              value={savedTheme.name}
              className="justify-between"
            >
              <div className="truncate">{savedTheme.name}</div>
              <div className="flex shadow-md">
                {getColorPalette(savedTheme, "light").map((color, i) => (
                  <div
                    className={`size-5 ${i === 0 && "rounded-l-md"} ${
                      i === savedThemes.length && "rounded-r-md"
                    }`}
                    style={{ backgroundColor: hslToHex(color!) }}
                  ></div>
                ))}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <Select onValueChange={changeTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {savedThemes.map((savedTheme) => (
            <SelectItem key={savedTheme.name} value={savedTheme.name}>
              <div className="">{savedTheme.name}</div>
              <span className="rounded-md flex">
                {getColorPalette(savedTheme, "light").map((colorVal, i) => (
                  <span
                    key={i}
                    style={{ backgroundColor: hslToHex(colorVal!) }}
                    className="size-4 inline-block"
                  ></span>
                ))}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
