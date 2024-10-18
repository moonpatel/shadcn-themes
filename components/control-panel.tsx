import useThemeConfig from "@/hooks/use-theme-config";
import { Button } from "./custom-ui/button";
import GenerateCodeButton from "./generate-code-button";
import { useThemeConfiguration } from "@/app/context/theme-config-provider";

export default function ControlPanel() {
  const { reset } = useThemeConfiguration();
  return (
    <div className="h-fit p-3 flex flex-col gap-3">
      <Button onClick={reset} variant="secondary">
        Reset
      </Button>
      <GenerateCodeButton />
    </div>
  );
}
