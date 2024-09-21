import useThemeConfig from "@/hooks/use-theme-config";
import { Button } from "./custom-ui/button";
import GenerateCodeButton from "./generate-code-button";

export default function ControlPanel() {
  const { reset } = useThemeConfig();
  return (
    <div className="h-fit p-3 flex flex-col gap-3">
      <Button onClick={reset} variant="secondary">
        Reset
      </Button>
      <GenerateCodeButton />
    </div>
  );
}
