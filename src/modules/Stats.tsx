import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";
import { AlarmClockCheck, CalendarClock, Hourglass } from "lucide-react";

const Stats = () => {
  const { statsPanelSize, statsPanel } = usePanelContext();
  const { pomodoroCount, totalTime, weeklyStreak } = useTimerContext();

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
        <div className="flex flex-col justify-start items-center gap-2">
          <div className="flex gap-2">
            <CalendarClock size={24} />
            Current Week:
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            {weeklyStreak?.map((day, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-center items-center rounded-full w-10 h-10 text-sm text-black ${
                    day.focused ? "bg-status-true" : "bg-status-false"
                  }`}
                >
                  <span>{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ResizablePanel>
  );
};
export default Stats;
