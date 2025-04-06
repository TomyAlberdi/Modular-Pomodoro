import { createContext } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

export interface PanelContextType {
  // Panel refs
  tasksPanel: React.RefObject<ImperativePanelHandle | null>;
  middlePanel: React.RefObject<ImperativePanelHandle | null>;
  statsPanel: React.RefObject<ImperativePanelHandle | null>;
  variablesPanel: React.RefObject<ImperativePanelHandle | null>;
  timerPanel: React.RefObject<ImperativePanelHandle | null>;
  streakPanel: React.RefObject<ImperativePanelHandle | null>;

  // Panel sizes
  tasksPanelSize: number;
  middlePanelSize: number;
  statsPanelSize: number;
  variablesPanelSize: number;
  timerPanelSize: number;
  streakPanelSize: number;

  // Panel controls
  resetPanelSizes: () => void;
}

export const PanelContext = createContext<PanelContextType | null>(null);
