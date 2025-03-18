import { ResizablePanel } from "@/components/ui/resizable";

// https://codesandbox.io/p/sandbox/stoic-cache-e7cie
const Timer = () => {
  return (
    <ResizablePanel
      defaultSize={50}
      className="flex justify-center items-center"
    >
      timer
    </ResizablePanel>
  );
};
export default Timer;
