import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";

const Streak = () => {
  const { pomodoroCount } = useTimerContext();
  const { streakPanelSize, streakPanel } = usePanelContext();
  //TODO: Design & implement streak panel
  return (
    <ResizablePanel
      ref={streakPanel}
      className="flex justify-center items-center"
      defaultSize={streakPanelSize}
    >
      (WIP) Completed Pomodoros: {pomodoroCount}
    </ResizablePanel>
  );
};
export default Streak;
