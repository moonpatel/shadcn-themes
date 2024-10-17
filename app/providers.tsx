"use client";

import ThemeProvider from "@/components/next-theme-provider";
import { Provider } from "jotai";
import { PropsWithChildren } from "react";

export default function Providers({ children, ...props }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Provider>{children}</Provider>
    </ThemeProvider>
  );
}
