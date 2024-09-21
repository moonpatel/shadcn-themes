"use client";

import CardsDefault from "@/components/examples";
import { ConfigurationTool } from "@/components/configuration-tool";

export default function Component() {
  return (
    <div className="flex max-h-screen">
      <div className="h-screen fixed">
        <ConfigurationTool />
      </div>
      <div className="flex-1 p-10 space-y-6 ml-64 h-full preview bg-background" id="preview">
        <CardsDefault />
      </div>
    </div>
  );
}
