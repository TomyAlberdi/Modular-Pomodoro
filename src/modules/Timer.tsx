import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { useTimerContext } from "@/context/UseTimerContext";
import { PauseCircle, PlayCircle } from "lucide-react";

// https://codesandbox.io/p/sandbox/stoic-cache-e7cie
const Timer = () => {
  const {
    timerDuration,
    isRunning,
    isStarted,
    remainingTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    cancelTimer,
    updateTimerDuration,
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
      <span className="text-6xl font-bold">{formatTime()}</span>
      <Button
        className="cursor-pointer"
        onClick={!isStarted ? startTimer : isRunning ? pauseTimer : resumeTimer}
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
    </ResizablePanel>
  );
};
export default Timer;
