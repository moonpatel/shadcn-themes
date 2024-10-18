"use client";

import ThemeProvider from "@/components/next-theme-provider";
import { Provider } from "jotai";
import { PropsWithChildren } from "react";
import ThemeConfigurationProvider from "./context/theme-config-provider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children, ...props }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ThemeConfigurationProvider>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </ThemeConfigurationProvider>
    </ThemeProvider>
  );
}
