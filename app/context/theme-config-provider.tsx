import { baseDarkTheme, baseLightTheme } from "@/config";
import useThemeConfig from "@/hooks/use-theme-config";
import { SetStateAction } from "jotai";
import React, { createContext, useContext } from "react";

const defaultTheme = {
  light: baseLightTheme,
  dark: baseDarkTheme,
  name: "Default",
  default: true,
};

const ThemeConfigurationContext = createContext<{
  addTheme: (name: string) => void;
  deleteTheme: (idx: number) => void;
  getCSSCode: () => string;
  isDirty: boolean;
  reset: () => void;
  saveTheme: () => void;
  savedThemes: SavedThemeConfig[];
  selectTheme: (idx: number) => void;
  setThemeConfig: (item: SetStateAction<SavedThemeConfig>) => void;
  themeConfig: SavedThemeConfig;
}>({
  addTheme: () => {},
  deleteTheme: () => {},
  getCSSCode: () => "",
  isDirty: false,
  reset: () => {},
  savedThemes: [structuredClone(defaultTheme)],
  saveTheme: () => {},
  selectTheme: () => {},
  setThemeConfig: () => {},
  themeConfig: structuredClone(defaultTheme),
});

export const useThemeConfiguration = () => {
  const context = useContext(ThemeConfigurationContext);
  if (!context) {
    throw Error(
      "You need to use ThemeConfigurationContext inside ThemeConfigurationtProvider"
    );
  }
  return context;
};

export default function ThemeConfigurationProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    addTheme,
    deleteTheme,
    getCSSCode,
    isDirty,
    reset,
    saveTheme,
    savedThemes,
    selectTheme,
    setThemeConfig,
    themeConfig,
  } = useThemeConfig();
  return (
    <ThemeConfigurationContext.Provider
      value={{
        addTheme,
        deleteTheme,
        getCSSCode,
        isDirty,
        reset,
        saveTheme,
        savedThemes,
        selectTheme,
        setThemeConfig,
        themeConfig,
      }}
    >
      {children}
    </ThemeConfigurationContext.Provider>
  );
}
