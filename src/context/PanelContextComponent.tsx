import { ReactNode, useRef, useState } from "react";
import { PanelContext, PanelContextType } from "@/context/PanelContext";
import type { ImperativePanelHandle } from "react-resizable-panels";

interface PanelContextComponentProps {
  children: ReactNode;
}

const PanelContextComponent: React.FC<PanelContextComponentProps> = ({
  children,
}) => {
  // Horizontal panel size states
  const [pausesPanelSize, setPausesPanelSize] = useState(33);
  const [middlePanelSize, setMiddlePanelSize] = useState(33);
  const [statsPanelSize, setStatsPanelSize] = useState(33);
  // Vertical panel size states
  const [variablesPanelSize, setVariablesPanelSize] = useState(33);
  const [timerPanelSize, setTimerPanelSize] = useState(33);
  const [streakPanelSize, setStreakPanelSize] = useState(33);

  // Panel refs
  const pausesPanel = useRef<ImperativePanelHandle>(null);
  const middlePanel = useRef<ImperativePanelHandle>(null);
  const statsPanel = useRef<ImperativePanelHandle>(null);
  const variablesPanel = useRef<ImperativePanelHandle>(null);
  const timerPanel = useRef<ImperativePanelHandle>(null);
  const streakPanel = useRef<ImperativePanelHandle>(null);

  const togglePausePanel = () => {
    const newSize = pausesPanelSize > 0 ? 0 : pausesPanelSize;
    setPausesPanelSize(newSize);
    pausesPanel.current?.resize(newSize);
  };

  const toggleStatsPanel = () => {
    const newSize = statsPanelSize > 0 ? 0 : statsPanelSize;
    setStatsPanelSize(newSize);
    statsPanel.current?.resize(newSize);
  };

  const toggleVariablesPanel = () => {
    const newSize = variablesPanelSize > 0 ? 0 : variablesPanelSize;
    setVariablesPanelSize(newSize);
    variablesPanel.current?.resize(newSize);
  };

  const toggleStreakPanel = () => {
    const newSize = streakPanelSize > 0 ? 0 : streakPanelSize;
    setStreakPanelSize(newSize);
    streakPanel.current?.resize(newSize);
  };

  const resetPanelSizes = () => {
    setPausesPanelSize(33);
    setMiddlePanelSize(33);
    setStatsPanelSize(33);
    setVariablesPanelSize(33);
    setTimerPanelSize(33);
    setStreakPanelSize(33);

    console.log("Attempting to reset panel sizes");

    pausesPanel.current?.resize(33);
    middlePanel.current?.resize(33);
    statsPanel.current?.resize(33);
    variablesPanel.current?.resize(33);
    timerPanel.current?.resize(33);
    streakPanel.current?.resize(33);
  };

  const exportData: PanelContextType = {
    pausesPanel,
    middlePanel,
    statsPanel,
    variablesPanel,
    timerPanel,
    streakPanel,
    pausesPanelSize,
    middlePanelSize,
    statsPanelSize,
    variablesPanelSize,
    timerPanelSize,
    streakPanelSize,
    togglePausePanel,
    toggleStatsPanel,
    toggleVariablesPanel,
    toggleStreakPanel,
    resetPanelSizes,
  };

  return (
    <PanelContext.Provider value={exportData}>{children}</PanelContext.Provider>
  );
};

export default PanelContextComponent;
