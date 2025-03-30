import { createContext } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

export interface PanelContextType {
  // Panel refs
  pausesPanel: React.RefObject<ImperativePanelHandle | null>;
  middlePanel: React.RefObject<ImperativePanelHandle | null>;
  statsPanel: React.RefObject<ImperativePanelHandle | null>;

  // Panel sizes
  pausesPanelSize: number;
  middlePanelSize: number;
  statsPanelSize: number;

  // Panel controls
  toggleStatsPanel: () => void;
  resetPanelSizes: () => void;
  setPanelSizes: (pauses: number, middle: number, stats: number) => void;
}

export const PanelContext = createContext<PanelContextType | null>(null);
