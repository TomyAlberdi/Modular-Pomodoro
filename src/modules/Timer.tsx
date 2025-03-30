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
    cancelTimer,
  } = useTimerContext();

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
    return `${minutes > 0 ? minutes + ":" : ""}${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <ResizablePanel
      className="flex flex-col justify-center items-center gap-4"
      minSize={33}
    >
      <span className="text-xl">
        {currentType.charAt(0).toUpperCase() + currentType.slice(1)}
      </span>
      <span className="text-6xl font-bold">{formatTime()}</span>
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={cancelTimer}
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
