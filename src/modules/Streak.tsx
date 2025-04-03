import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";

const Streak = () => {
  const { currentStreak } = useTimerContext();
  const { streakPanelSize, streakPanel } = usePanelContext();
  //TODO: Design & implement streak panel
  return (
    <ResizablePanel
      ref={streakPanel}
      className="flex justify-center items-center"
      defaultSize={streakPanelSize}
    >
      (WIP) Current Pomodoro Streak: {currentStreak}
    </ResizablePanel>
  );
};
export default Streak;
