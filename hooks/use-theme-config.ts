import { baseDarkTheme, baseLightTheme } from "@/config";
import { atom, useAtom } from "jotai";

const themeConfigAtom = atom<ThemeConfig>({
  light: baseLightTheme,
  dark: baseDarkTheme,
});
const resetThemeConfigAtom = atom(null, (get, set) => {
  set(themeConfigAtom, () => ({ light: baseLightTheme, dark: baseDarkTheme }));
});

export default function useThemeConfig() {
  const [themeConfig, setThemeConfig] = useAtom(themeConfigAtom);
  const [, reset] = useAtom(resetThemeConfigAtom);
  return { themeConfig, setThemeConfig, reset };
}
