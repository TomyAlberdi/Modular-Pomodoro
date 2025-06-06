import { Task, WeeklyStreak } from "@/interfaces/Interfaces";
import { createContext } from "react";

export type TimerType = "pomodoro" | "shortBreak" | "longBreak";

export interface TimerContextType {
  // Timer settings
  currentType: TimerType;
  isRunning: boolean;
  isStarted: boolean;
  remainingTime: number;
  currentStreak: number;
  // Stats
  pomodoroCount: number;
  totalTime: number;
  weeklyStreak: Array<WeeklyStreak>;
  tasks: Array<Task> | [];
  // Util
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
  addTask: (task: Task) => boolean | string;
  toggleTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  deleteAllTasks: () => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);
