import { createContext } from "react";

export interface TimerContextType {
  timerDuration: number;
  isRunning: boolean;
  isStarted: boolean;
  remainingTime: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  cancelTimer: () => void;
  updateTimerDuration: (newDuration: number) => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);
