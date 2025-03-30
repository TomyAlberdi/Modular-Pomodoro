import { ReactNode, useState, useCallback, useRef } from "react";
import {
  TimerContext,
  TimerContextType,
  TimerType,
} from "@/context/TimerContext";

interface TimerContextComponentProps {
  children: ReactNode;
}

const TimerContextComponent: React.FC<TimerContextComponentProps> = ({
  children,
}) => {
  // Timer type and count states
  const [currentType, setCurrentType] = useState<TimerType>("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // Timer duration states
  const [pomodoroDuration, setPomodoroDuration] = useState(1500);
  const [shortBreakDuration, setShortBreakDuration] = useState(300);
  const [longBreakDuration, setLongBreakDuration] = useState(900);

  // Timer control states
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(pomodoroDuration);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  // Returns duration based on current timer type
  const getCurrentDuration = useCallback(() => {
    switch (currentType) {
      case "pomodoro":
        return pomodoroDuration;
      case "shortBreak":
        return shortBreakDuration;
      case "longBreak":
        return longBreakDuration;
    }
  }, [pomodoroDuration, shortBreakDuration, longBreakDuration, currentType]);

  // Moves to the next timer type
  const moveToNextTimer = useCallback(() => {
    if (currentType === "pomodoro") {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      setCurrentType(newCount % 4 === 0 ? "longBreak" : "shortBreak");
    } else {
      setCurrentType("pomodoro");
    }
  }, [currentType, pomodoroCount]);

  // Starts the timer
  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsStarted(true);
    setRemainingTime(getCurrentDuration());
    timerIdRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIdRef.current!);
          setIsRunning(false);
          moveToNextTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [getCurrentDuration, moveToNextTimer]);

  // Pauses the timer
  const pauseTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      setIsRunning(false);
    }
  }, []);

  // Resumes the timer
  const resumeTimer = useCallback(() => {
    if (!isRunning && remainingTime > 0) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerIdRef.current!);
            setIsRunning(false);
            moveToNextTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, remainingTime, moveToNextTimer]);

  // Cancels/Restarts the timer
  const cancelTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    setIsRunning(false);
    setIsStarted(false);
    setRemainingTime(getCurrentDuration());
  }, [getCurrentDuration]);

  // Jumps to the next timer type
  const skipTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    moveToNextTimer();
    setIsRunning(false);
    setIsStarted(false);
    setRemainingTime(getCurrentDuration());
  }, [moveToNextTimer, getCurrentDuration]);

  // Updates the pomodoro timer duration
  const updatePomodoroDuration = useCallback(
    (duration: number) => {
      setPomodoroDuration(duration);
      if (currentType === "pomodoro") setRemainingTime(duration);
    },
    [currentType]
  );

  // Updates the short break timer duration
  const updateShortBreakDuration = useCallback(
    (duration: number) => {
      setShortBreakDuration(duration);
      if (currentType === "shortBreak") setRemainingTime(duration);
    },
    [currentType]
  );

  // Updates the long break timer duration
  const updateLongBreakDuration = useCallback(
    (duration: number) => {
      setLongBreakDuration(duration);
      if (currentType === "longBreak") setRemainingTime(duration);
    },
    [currentType]
  );

  const exportData: TimerContextType = {
    currentType,
    isRunning,
    isStarted,
    remainingTime,
    pomodoroCount,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    startTimer,
    pauseTimer,
    resumeTimer,
    cancelTimer,
    skipTimer,
    updatePomodoroDuration,
    updateShortBreakDuration,
    updateLongBreakDuration,
  };

  return (
    <TimerContext.Provider value={exportData}>{children}</TimerContext.Provider>
  );
};

export default TimerContextComponent;
