import { ReactNode, useState, useRef, useCallback, useEffect } from "react";
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
  const [pomodoroDuration, setPomodoroDuration] = useState(5);
  const [shortBreakDuration, setShortBreakDuration] = useState(3);
  const [longBreakDuration, setLongBreakDuration] = useState(10);

  // Timer control states
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(pomodoroDuration);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  // Centralized timer logic
  const startCountdown = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    setIsRunning(true);
    setIsStarted(true);

    timerIdRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIdRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Moves to the next timer type and updates state
  const moveToNextTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    let nextType: TimerType;
    if (currentType === "pomodoro") {
      setPomodoroCount((prev) => prev + 1);
      nextType = (pomodoroCount + 1) % 4 === 0 ? "longBreak" : "shortBreak";
    } else {
      nextType = "pomodoro";
    }

    const nextDuration =
      nextType === "pomodoro"
        ? pomodoroDuration
        : nextType === "shortBreak"
        ? shortBreakDuration
        : longBreakDuration;

    setCurrentType(nextType);
    setRemainingTime(nextDuration);
    startCountdown();
  }, [
    currentType,
    pomodoroCount,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    startCountdown,
  ]);

  // Starts the timer
  const startTimer = useCallback(() => {
    startCountdown();
  }, [startCountdown]);

  // Pauses the timer
  const pauseTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
      setIsRunning(false);
    }
  }, []);

  // Resumes the timer
  const resumeTimer = useCallback(() => {
    if (!isRunning && remainingTime > 0) {
      startCountdown();
    }
  }, [isRunning, remainingTime, startCountdown]);

  // Resets the timer
  const resetTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
    setIsStarted(false);
    setCurrentType("pomodoro");
    setRemainingTime(pomodoroDuration);
    setPomodoroCount(0);
  }, [pomodoroDuration]);

  // Auto-transition to next timer when current one ends
  useEffect(() => {
    if (remainingTime === 0 && isStarted) {
      moveToNextTimer();
    }
  }, [remainingTime, isStarted, moveToNextTimer]);

  // Force jumps to the next timer
  const skipTimer = () => {
    moveToNextTimer();
  };

  // Updates the pomodoro timer duration
  const updatePomodoroDuration = (duration: number) => {
    setPomodoroDuration(duration);
    resetTimer();
  };

  // Updates the short break timer duration
  const updateShortBreakDuration = (duration: number) => {
    setShortBreakDuration(duration);
    resetTimer();
  };

  // Updates the long break timer duration
  const updateLongBreakDuration = (duration: number) => {
    setLongBreakDuration(duration);
    resetTimer();
  };

  // Formats the remaining time
  const formatRemainingTime = (seconds: number) => {
    const formattedTime = `${
      Math.floor(seconds / 60) > 0 ? Math.floor(seconds / 60) + ":" : ""
    }${
      Math.floor(seconds % 60) < 10
        ? "0" + Math.floor(seconds % 60)
        : Math.floor(seconds % 60)
    }`;
    return formattedTime;
  };

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
    resetTimer,
    skipTimer,
    updatePomodoroDuration,
    updateShortBreakDuration,
    updateLongBreakDuration,
    formatRemainingTime,
  };

  return (
    <TimerContext.Provider value={exportData}>{children}</TimerContext.Provider>
  );
};

export default TimerContextComponent;
