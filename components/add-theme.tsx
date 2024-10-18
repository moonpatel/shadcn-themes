"use client";
import useThemeConfig from "@/hooks/use-theme-config";
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
import { Input } from "./custom-ui/input";
import { MouseEventHandler, useState } from "react";
import { Plus } from "lucide-react";
import { useThemeConfiguration } from "@/app/context/theme-config-provider";

export default function AddThemeButton() {
  const { addTheme } = useThemeConfiguration();
  const [themeName, setThemeName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (evt: any) => {
    if (themeName.length > 20) {
      evt.preventDefault();
      setErrorMsg("Theme name must be 20 characters at maximum");
      return;
    } else if (themeName.length < 3) {
      evt.preventDefault();
      setErrorMsg("Theme name must be at least 3 characters.");
      return;
    }
    addTheme(themeName);
    setThemeName("");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Plus className="size-5 cursor-pointer" />
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
            onChange={(evt) => {
              if (themeName.length < 3) {
                setErrorMsg("Theme name must be at least 3 characters.");
              } else if (themeName.length > 20) {
                setErrorMsg("Theme name must be 20 characters at maximum");
              } else {
                setErrorMsg("");
              }
              setThemeName(evt.target.value);
            }}
            placeholder="Enter theme name"
          />
          <div className="text-red-600 text-sm my-2 mt-3">
            {errorMsg !== "" && errorMsg}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={errorMsg !== ""} onClick={onSubmit}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
