"use client";
import useThemeConfig from "@/hooks/use-theme-config";
import { Button } from "./custom-ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./custom-ui/alert-dialog";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./custom-ui/form";
import { Input } from "./custom-ui/input";
import { FormEvent, MouseEventHandler, useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Theme name must be at least 3 characters.",
    })
    .max(20, { message: "Theme name must be 20 characters at maximum" }),
});

type formType = z.infer<typeof formSchema>;

export default function SaveThemeButton() {
  const { themeConfig, saveTheme } = useThemeConfig();
  const [themeName, setThemeName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit() {
    if (themeName.length > 20) {
      setErrorMsg("Theme name must be 20 characters at maximum");
      return;
    } else if (themeName.length < 3) {
      setErrorMsg("Theme name must be at least 3 characters.");
      return;
    }
    saveTheme({ ...themeConfig, name: themeName });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Save Theme</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save theme</AlertDialogTitle>
          <AlertDialogDescription>
            Save current theme config as your own custom theme.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={(evt) => evt.preventDefault()}>
          <Input
            value={themeName}
            onChange={(evt) => setThemeName(evt.target.value)}
            placeholder="Enter theme name"
          />
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
