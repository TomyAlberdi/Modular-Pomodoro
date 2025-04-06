export interface TimerSettings {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export interface WeeklyStreak {
  day: string;
  focused: boolean;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface UserData {
  pomodoroCount: number;
  totalTime: number;
  weeklyStreak: Array<WeeklyStreak>;
  lastWeeklyReset: string;
  tasks: Array<Task> | null;
}

