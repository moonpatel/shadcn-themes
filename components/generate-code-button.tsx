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
import { Check, Copy } from "lucide-react";
import generateCssCode from "@/lib/generate";

export default function GenerateCodeButton() {
  const { themeConfig } = useThemeConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(themeConfig, null, 2));
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
        className="flex items-center justify-center w-full h-12 rounded-lg"
      >
        Generate Code
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generated Code</DialogTitle>
            <DialogDescription>
              <div className="relative">
                <pre className="bg-primary text-primary-foreground block p-4 rounded-lg overflow-y-scroll h-[720px]">
                  {generateCssCode(themeConfig)}
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
