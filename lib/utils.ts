import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorPairs(theme: ColorTheme): ColorPair[] {
  return [
    {
      label: "Background",
      background: theme["--background"],
      foreground: theme["--foreground"],
      cssVariable: "--background",
    },
    {
      label: "Card",
      background: theme["--card"],
      foreground: theme["--card-foreground"],
      cssVariable: "--card",
    },
    {
      label: "Popover",
      background: theme["--popover"],
      foreground: theme["--popover-foreground"],
      cssVariable: "--popover",
    },
    {
      label: "Primary",
      background: theme["--primary"],
      foreground: theme["--primary-foreground"],
      cssVariable: "--primary",
    },
    {
      label: "Secondary",
      background: theme["--secondary"],
      foreground: theme["--secondary-foreground"],
      cssVariable: "--secondary",
    },
    {
      label: "Muted",
      background: theme["--muted"],
      foreground: theme["--muted-foreground"],
      cssVariable: "--muted",
    },
    {
      label: "Accent",
      background: theme["--accent"],
      foreground: theme["--accent-foreground"],
      cssVariable: "--accent",
    },
    {
      label: "Destructive",
      background: theme["--destructive"],
      foreground: theme["--destructive-foreground"],
      cssVariable: "--destructive",
    },
  ];
}

export function getSingleColors(theme: ColorTheme): ColorSingle[] {
  return [
    { label: "Border", cssVariable: "--border", value: theme["--border"] },
    { label: "Input", cssVariable: "--input", value: theme["--input"] },
    { label: "Ring", cssVariable: "--ring", value: theme["--ring"] },
    { label: "Chart 1", cssVariable: "--chart-1", value: theme["--chart-1"] },
    { label: "Chart 2", cssVariable: "--chart-2", value: theme["--chart-2"] },
    { label: "Chart 3", cssVariable: "--chart-3", value: theme["--chart-3"] },
    { label: "Chart 4", cssVariable: "--chart-4", value: theme["--chart-4"] },
    { label: "Chart 5", cssVariable: "--chart-5", value: theme["--chart-5"] },
  ];
}

export default function getColorPalette(
  theme: ThemeConfig,
  mode: "light" | "dark"
) {
  const props: ThemeProperty[] = [
    "--primary",
    "--background",
    "--card",
    "--foreground",
    "--secondary",
  ];
  return mode === "dark"
    ? props.map((prop) => theme.dark[prop])
    : props.map((prop) => theme.light[prop]);
}
