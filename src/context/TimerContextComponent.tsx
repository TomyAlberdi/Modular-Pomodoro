import { ReactNode, useState, useCallback, useRef } from "react";
import { TimerContext, TimerContextType } from "@/context/TimerContext";

interface TimerContextComponentProps {
  children: ReactNode;
}

const TimerContextComponent: React.FC<TimerContextComponentProps> = ({
  children,
}) => {
  const [timerDuration, setTimerDuration] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timerDuration);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsStarted(true);
    setRemainingTime(timerDuration);
    timerIdRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIdRef.current!);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerDuration]);

  const pauseTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      setIsRunning(false);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (!isRunning && remainingTime > 0) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerIdRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, remainingTime]);

  const cancelTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setIsRunning(false);
    setIsStarted(false);
    setRemainingTime(timerDuration);
  }, [timerDuration]);

  const updateTimerDuration = useCallback((newDuration: number) => {
    setTimerDuration(newDuration);
    setRemainingTime(newDuration);
  }, []);

  const exportData: TimerContextType = {
    timerDuration,
    isRunning,
    isStarted,
    remainingTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    cancelTimer,
    updateTimerDuration,
  };

  return (
    <TimerContext.Provider value={exportData}>{children}</TimerContext.Provider>
  );
};

export default TimerContextComponent;