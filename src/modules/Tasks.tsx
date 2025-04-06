import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";

const Tasks = () => {
  const { tasksPanelSize, tasksPanel } = usePanelContext();

  return (
    <ResizablePanel
      ref={tasksPanel}
      defaultSize={tasksPanelSize}
      className="flex justify-center items-center"
    >
      (WIP) Tasks
    </ResizablePanel>
  );
};
export default Tasks;
