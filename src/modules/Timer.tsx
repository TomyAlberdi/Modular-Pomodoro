import { ResizablePanel } from "@/components/ui/resizable";

// https://codesandbox.io/p/sandbox/stoic-cache-e7cie
const Timer = () => {
  return (
    <ResizablePanel
      className="flex justify-center items-center"
      minSize={25}
    >
      timer
    </ResizablePanel>
  );
};
export default Timer;
