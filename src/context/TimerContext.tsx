import { createContext } from "react";
import { WeeklyStreak } from "@/context/TimerContextComponent";

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerContextType {
  currentType: TimerType;
  isRunning: boolean;
  isStarted: boolean;
  remainingTime: number;
  currentStreak: number;
  pomodoroCount: number;
  totalTime: number;
  weeklyStreak: Array<WeeklyStreak>;
  formatRemainingTime: (seconds: number) => string;

  // Timer durations
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;

  // Timer controls
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;

  // Duration & Stats setters
  updatePomodoroDuration: (duration: number) => void;
  updateShortBreakDuration: (duration: number) => void;
  updateLongBreakDuration: (duration: number) => void;
  resetStats: () => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);
