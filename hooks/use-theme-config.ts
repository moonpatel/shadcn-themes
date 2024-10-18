import { baseDarkTheme, baseLightTheme } from "@/config";
import generateCssCode from "@/lib/generate";
import { atom, useAtom } from "jotai";
import { atomWithReset, atomWithStorage } from "jotai/utils";
import { SetStateAction, useCallback, useEffect, useState } from "react";

const defaultTheme = {
  light: baseLightTheme,
  dark: baseDarkTheme,
  name: "Default",
  default: true,
};

const themeConfigAtom = atom<SavedThemeConfig>(defaultTheme);
const resetThemeConfigAtom = atomWithReset<SavedThemeConfig>(defaultTheme);

const savedThemesAtom = atomWithStorage<SavedThemeConfig[]>("saved_themes", [
  {
    light: baseLightTheme,
    dark: baseDarkTheme,
    name: "Default",
    default: true,
  },
]);

const changeThemeConfigAtom = atom(null, (get, set, themeName: string) => {
  const themes = get(savedThemesAtom);
  const newTheme = themes.find((theme) => theme.name === themeName);
  if (newTheme) {
    set(themeConfigAtom, {
      dark: newTheme.dark,
      light: newTheme.light,
      name: newTheme.name,
      default: true,
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
  const [themeIndex, setThemeIndex] = useState(0);
  const [savedThemes, setSavedThemes] = useAtom(savedThemesAtom);

  const saveTheme = useCallback(() => {
    if (themeIndex < 0 || themeIndex >= savedThemes.length) return;
    if (savedThemes[themeIndex].default) return;
    console.log("HEY", themeConfig, themeIndex, savedThemes);
    const newSavedThemes = structuredClone(savedThemes);
    newSavedThemes[themeIndex] = structuredClone(themeConfig);
    setSavedThemes(newSavedThemes);
  }, [savedThemes, themeIndex, setSavedThemes, themeConfig]);

  const selectTheme = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < savedThemes.length) {
        setThemeIndex(idx);
      }
    },
    [setThemeIndex, savedThemes]
  );

  const addTheme = useCallback(
    (name: string) => {
      const newSavedThemes = structuredClone(savedThemes);
      const newTheme = structuredClone(defaultTheme);
      newTheme.name = name;
      newTheme.default = false;
      newSavedThemes.push(newTheme);
      setSavedThemes(newSavedThemes);
    },
    [savedThemes, setSavedThemes]
  );

  const deleteTheme = useCallback(
    (idx: number) => {
      console.log(idx);
      if (idx < 0 || idx >= savedThemes.length) return;
      if (savedThemes[themeIndex].default) return;
      const newSavedThemes = structuredClone(savedThemes);
      newSavedThemes.splice(idx, 1);
      themeIndex === idx && setThemeIndex(0); // set to default theme
      setSavedThemes(newSavedThemes);
    },
    [savedThemes, themeIndex, setThemeIndex, setSavedThemes]
  );

  const reset = useCallback(() => {
    setThemeConfig(savedThemes[themeIndex]);
  }, [setThemeConfig, savedThemes, themeIndex]);

  const getCSSCode = useCallback(
    () => generateCssCode(savedThemes[themeIndex]),
    [savedThemes, themeIndex]
  );

  useEffect(() => {
    setThemeConfig(savedThemes[themeIndex]);
  }, [themeIndex, savedThemes, setThemeConfig]);

  const isDirty =
    JSON.stringify(savedThemes.at(themeIndex)) !== JSON.stringify(themeConfig);

  return {
    themeConfig,
    setThemeConfig,
    isDirty,
    savedThemes,
    saveTheme,
    selectTheme,
    reset,
    deleteTheme,
    addTheme,
    getCSSCode,
  };
}
