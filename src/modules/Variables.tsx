import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";

const Variables = () => {
  const {
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    updatePomodoroDuration,
    updateShortBreakDuration,
    updateLongBreakDuration,
  } = useTimerContext();

  const secondsToMinutes = (seconds: number) => {
    return Math.floor(seconds / 60);
  };

  const minutesToSeconds = (minutes: number) => {
    return minutes * 60;
  };

  const { variablesPanelSize, variablesPanel } = usePanelContext();

  return (
    <ResizablePanel
      className="flex flex-col justify-center items-center gap-2"
      defaultSize={variablesPanelSize}
      ref={variablesPanel}
    >
      <span className="text-lg font-semibold">Time (Minutes)</span>
      <section className="flex flex-col justify-center items-center gap-2 w-[90%]">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pomodoroDuration">Pomodoro Duration</Label>
          <Input
            type="number"
            id="pomodoroDuration"
            value={secondsToMinutes(pomodoroDuration)}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value));
              updatePomodoroDuration(minutesToSeconds(value));
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="shortBreakDuration">Short Break Duration</Label>
          <Input
            id="shortBreakDuration"
            value={secondsToMinutes(shortBreakDuration)}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value));
              updateShortBreakDuration(minutesToSeconds(value));
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="longBreakDuration">Long Break Duration</Label>
          <Input
            id="longBreakDuration"
            value={secondsToMinutes(longBreakDuration)}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value));
              updateLongBreakDuration(minutesToSeconds(value));
            }}
          />
        </div>
      </section>
    </ResizablePanel>
  );
};
export default Variables;
