interface ColorTheme {
  "--background": string;
  "--foreground": string;
  "--card": string;
  "--card-foreground": string;
  "--popover": string;
  "--popover-foreground": string;
  "--primary": string;
  "--primary-foreground": string;
  "--secondary": string;
  "--secondary-foreground": string;
  "--muted": string;
  "--muted-foreground": string;
  "--accent": string;
  "--accent-foreground": string;
  "--destructive": string;
  "--destructive-foreground": string;
  "--border": string;
  "--input": string;
  "--ring": string;
  "--chart-1": string;
  "--chart-2": string;
  "--chart-3": string;
  "--chart-4": string;
  "--chart-5": string;
  "--radius"?: string;
}

type ThemeProperty =
  | "--background"
  | "--foreground"
  | "--card"
  | "--card-foreground"
  | "--popover"
  | "--popover-foreground"
  | "--primary"
  | "--primary-foreground"
  | "--secondary"
  | "--secondary-foreground"
  | "--muted"
  | "--muted-foreground"
  | "--accent"
  | "--accent-foreground"
  | "--destructive"
  | "--destructive-foreground"
  | "--border"
  | "--input"
  | "--ring"
  | "--chart-1"
  | "--chart-2"
  | "--chart-3"
  | "--chart-4"
  | "--chart-5"
  | "--radius";

interface ThemeConfig {
  light: ColorTheme;
  dark: ColorTheme;
}

interface SavedThemeConfig extends ThemeConfig {
  name: string;
}

interface ColorPair {
  label: string;
  background: string;
  foreground: string;
  cssVariable: ThemeProperty;
}

interface ColorSingle {
  label: string;
  value: string;
  cssVariable: ThemeProperty;
}
