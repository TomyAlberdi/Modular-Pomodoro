import { createContext } from "react";

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerContextType {
  currentType: TimerType;
  isRunning: boolean;
  isStarted: boolean;
  remainingTime: number;
  pomodoroCount: number;

  // Timer durations
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;

  // Timer controls
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  cancelTimer: () => void;
  skipTimer: () => void;

  // Duration setters
  updatePomodoroDuration: (duration: number) => void;
  updateShortBreakDuration: (duration: number) => void;
  updateLongBreakDuration: (duration: number) => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);
