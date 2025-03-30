import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";

const Pauses = () => {
  const { pausesPanelSize } = usePanelContext();

  return (
    <ResizablePanel
      defaultSize={pausesPanelSize}
      className="flex justify-center items-center"
    >
      pauses
    </ResizablePanel>
  );
};
export default Pauses;
