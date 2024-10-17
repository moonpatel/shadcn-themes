import { baseDarkTheme, baseLightTheme } from "@/config";
import { atom, useAtom } from "jotai";
import { atomWithReset, atomWithStorage } from "jotai/utils";
import useStateWithReset from "./use-state-with-reset";

const themeConfigAtom = atom<SavedThemeConfig>({
  light: baseLightTheme,
  dark: baseDarkTheme,
  name: "Default",
});
const resetThemeConfigAtom = atomWithReset<SavedThemeConfig>({
  light: baseLightTheme,
  dark: baseDarkTheme,
  name: "Default",
});

const savedThemesAtom = atomWithStorage<SavedThemeConfig[]>("saved_themes", [
  { light: baseLightTheme, dark: baseDarkTheme, name: "Default" },
]);

const changeThemeConfigAtom = atom(null, (get, set, themeName: string) => {
  const themes = get(savedThemesAtom);
  const newTheme = themes.find((theme) => theme.name === themeName);
  if (newTheme) {
    set(themeConfigAtom, {
      dark: newTheme.dark,
      light: newTheme.light,
      name: newTheme.name,
    });
  }
});

const saveThemeAtom = atom(null, (get, set, themeConfig: SavedThemeConfig) => {
  const themes = get(savedThemesAtom);
  const foundTheme = themes.find((theme) => theme.name === themeConfig.name);
  if (!foundTheme) {
    console.log("saving............");
    const newSavedThemes = [...get(savedThemesAtom), themeConfig];
    set(savedThemesAtom, newSavedThemes);
  }
});

export default function useThemeConfig() {
  const [themeConfig, setThemeConfig] = useAtom(themeConfigAtom);
  const [savedThemes] = useAtom(savedThemesAtom);
  const [, reset] = useAtom(resetThemeConfigAtom);
  const [, changeTheme] = useAtom(changeThemeConfigAtom);
  const [, saveTheme] = useAtom(saveThemeAtom);
  return {
    themeConfig,
    setThemeConfig,
    reset,
    savedThemes,
    changeTheme,
    saveTheme,
  };
}
