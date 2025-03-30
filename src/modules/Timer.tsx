import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { useTimerContext } from "@/context/UseTimerContext";
import { PauseCircle, PlayCircle, SkipForward, Square } from "lucide-react";

// https://codesandbox.io/p/sandbox/stoic-cache-e7cie
const Timer = () => {
  const {
    isRunning,
    isStarted,
    remainingTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    currentType,
    skipTimer,
    resetTimer,
    formatRemainingTime,
  } = useTimerContext();

  return (
    <ResizablePanel
      className="flex flex-col justify-center items-center gap-4"
      minSize={33}
    >
      <span className="text-xl">
        {currentType.charAt(0).toUpperCase() + currentType.slice(1)}
      </span>
      <span className="text-6xl font-bold">
        {formatRemainingTime(remainingTime)}
      </span>
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={resetTimer}
        >
          <Square />
        </Button>
        <Button
          className="cursor-pointer"
          onClick={
            !isStarted ? startTimer : isRunning ? pauseTimer : resumeTimer
          }
        >
          {isRunning ? (
            <>
              <PauseCircle />
              <span>Pause</span>
            </>
          ) : isStarted ? (
            <>
              <PlayCircle />
              <span>Resume</span>
            </>
          ) : (
            <>
              <PlayCircle />
              <span>Start</span>
            </>
          )}
        </Button>
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={skipTimer}
        >
          <SkipForward />
        </Button>
      </div>
    </ResizablePanel>
  );
};
export default Timer;
