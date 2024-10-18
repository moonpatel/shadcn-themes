import useThemeConfig from "@/hooks/use-theme-config";
import { Button } from "./custom-ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./custom-ui/dialog";
import { Check, Copy, Sparkles } from "lucide-react";
import { useThemeConfiguration } from "@/app/context/theme-config-provider";

export default function GenerateCodeButton() {
  const { getCSSCode } = useThemeConfiguration();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(getCSSCode());
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="relative overflow-hidden group"
      >
        <Sparkles className="size-4 mr-2 z-10" />
        <span className="relative z-10">Generate Code</span>
        <div className="absolute inset-0 w-[100%] group-hover:animate-flow"></div>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generated Code</DialogTitle>
            <DialogDescription>
              <div className="py-4">
                <p>
                  Replace the existing CSS code in your project with the code
                  below. Make sure you are using CSS variables in your shadcn
                  configuration.
                </p>
                <p className="font-semibold">
                  This configuration is only for the default CSS variables
                  available in Shadcn.
                </p>
              </div>
              <div className="relative">
                <pre className="bg-primary text-primary-foreground block p-4 rounded-lg overflow-y-scroll h-[720px]">
                  {getCSSCode()}
                </pre>
                <Button
                  onClick={handleCopy}
                  variant="secondary"
                  className="absolute top-2 right-2 p-2 rounded"
                >
                  {isCopied ? (
                    <Check className="size-4 mr-2" />
                  ) : (
                    <Copy className="size-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
