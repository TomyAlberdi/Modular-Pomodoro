import { createContext } from "react";

export interface TimerContextType {
  timerDuration: number;
}

export const TimerContext = createContext<TimerContextType | null>(null);
