"use client";

import ThemeProvider from "@/components/next-theme-provider";
import { PropsWithChildren } from "react";

export default function Providers({ children, ...props }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
