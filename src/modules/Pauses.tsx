import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";

const Pauses = () => {
  const { pausesPanelSize, pausesPanel } = usePanelContext();

  return (
    <ResizablePanel
      ref={pausesPanel}
      defaultSize={pausesPanelSize}
      className="flex justify-center items-center"
    >
      (WIP) Pauses
    </ResizablePanel>
  );
};
export default Pauses;
