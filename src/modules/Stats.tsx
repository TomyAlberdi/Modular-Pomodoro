import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";

const Stats = () => {
  const { statsPanelSize, statsPanel } = usePanelContext();

  return (
    <ResizablePanel
      ref={statsPanel}
      defaultSize={statsPanelSize}
      className="flex justify-center items-center"
    >
      (WIP) Stats
    </ResizablePanel>
  );
};
export default Stats;
