import ChatComposer from "@/components/shared/chat-composer";
import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <h1 className="text-xl md:text-3xl font-bold">What would you like to do?</h1>
      <p className="text-sm md:text-base font-light text-slate-300">If a human can do it in browser, zest can automate it.</p>
      <div className="w-full px-4 md:px-0 md:w-1/2">
        <ChatComposer />
      </div>
      <div className="mt-4">
        <OrganizationSwitcher />
      </div>
    </div>
  );
}
