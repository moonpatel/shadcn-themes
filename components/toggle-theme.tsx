"use client";

import { useTheme } from "next-themes";
import { Button } from "./custom-ui/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2 rounded-full"
    >
      {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  );
}
