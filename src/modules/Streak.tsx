import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";
import { Flame, Frown } from "lucide-react";

const Streak = () => {
  const { currentStreak } = useTimerContext();
  const { streakPanelSize, streakPanel } = usePanelContext();
  //TODO: Design & implement streak panel
  return (
    <ResizablePanel
      ref={streakPanel}
      className="flex flex-col justify-center items-center gap-5"
      defaultSize={streakPanelSize}
    >
      <span className="text-xl">Current Streak: {currentStreak}</span>
      <div className="flex justify-center items-center gap-2 flex-wrap w-4/5">
        {currentStreak === 0 ? (
          <Frown size={30} />
        ) : (
          Array(currentStreak)
            .fill(0)
            .map((_, index) => {
              return <Flame key={index} />;
            })
        )}
      </div>
    </ResizablePanel>
  );
};
export default Streak;
