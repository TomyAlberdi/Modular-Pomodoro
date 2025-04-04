import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";
import { AlarmClockCheck, Hourglass } from "lucide-react";

const Stats = () => {
  const { statsPanelSize, statsPanel } = usePanelContext();
  const { pomodoroCount, totalTime } = useTimerContext();

  return (
    <ResizablePanel
      ref={statsPanel}
      defaultSize={statsPanelSize}
      className="flex flex-col justify-center items-center gap-5 whitespace-nowrap"
    >
      <span className="text-xl">Stats</span>
      <section className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-row justify-start items-center gap-2">
          <AlarmClockCheck size={24} />
          Completed Pomodoros:
          <span className="text-xl font-semibold">{pomodoroCount}</span>
        </div>
        <div className="flex flex-row justify-start items-center gap-2">
          <Hourglass size={24} />
          Minutes Focused:
          <span className="text-xl font-semibold">
            {Math.floor(totalTime / 60)}
          </span>
        </div>
      </section>
    </ResizablePanel>
  );
};
export default Stats;
