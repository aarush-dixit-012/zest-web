"use client"

import { useState } from "react"
import ChatComposer from "@/components/shared/chat-composer";
import Image from "next/image";

const suggestions = [
  "Configure Porsche 911",
  "Play Chess",
];

export default function Page() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <Image src="/icon.svg" alt="Zest" width={48} height={48} />
      <h1 className="text-xl md:text-3xl font-bold">What would you like to do?</h1>
      <p className="text-sm md:text-base font-light text-muted-foreground">If a human can do it in browser, zest can automate it.</p>
      <div className="w-full px-4 md:px-0 md:w-1/2">
        <ChatComposer value={value} onChange={setValue} />
        <div className="hidden md:flex justify-center gap-2 mt-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setValue(suggestion)}
              className="px-4 py-2 rounded-lg border text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
