import CardsDefault from "@/components/examples";
import { ConfigurationTool } from "@/components/configuration-tool";
import ToggleTheme from "@/components/toggle-theme";

export default function Component() {
  return (
    <div className="flex max-h-screen relative">
      <ConfigurationTool />
      <div
        className="flex-1 p-10 space-y-6 2xl:px-40 min-w-[480px] overflow-x-scroll h-full preview bg-background"
        id="preview"
      >
        <CardsDefault />
      </div>
      <ToggleTheme />
    </div>
  );
}
