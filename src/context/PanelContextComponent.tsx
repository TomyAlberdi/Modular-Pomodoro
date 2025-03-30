import { ReactNode, useRef, useState } from "react";
import { PanelContext, PanelContextType } from "@/context/PanelContext";
import type { ImperativePanelHandle } from "react-resizable-panels";

interface PanelContextComponentProps {
  children: ReactNode;
}

const PanelContextComponent: React.FC<PanelContextComponentProps> = ({
  children,
}) => {
  // Panel size states
  const [pausesPanelSize, setPausesPanelSize] = useState(30);
  const [middlePanelSize, setMiddlePanelSize] = useState(30);
  const [statsPanelSize, setStatsPanelSize] = useState(30);

  // Panel refs
  const pausesPanel = useRef<ImperativePanelHandle>(null);
  const middlePanel = useRef<ImperativePanelHandle>(null);
  const statsPanel = useRef<ImperativePanelHandle>(null);

  const toggleStatsPanel = () => {
    const newSize = statsPanelSize > 0 ? 0 : 30;
    setStatsPanelSize(newSize);
    statsPanel.current?.resize(newSize);
  };

  const resetPanelSizes = () => {
    setPausesPanelSize(30);
    setMiddlePanelSize(30);
    setStatsPanelSize(30);
    
    pausesPanel.current?.resize(30);
    middlePanel.current?.resize(30);
    statsPanel.current?.resize(30);
  };

  const setPanelSizes = (pauses: number, middle: number, stats: number) => {
    setPausesPanelSize(pauses);
    setMiddlePanelSize(middle);
    setStatsPanelSize(stats);
    
    pausesPanel.current?.resize(pauses);
    middlePanel.current?.resize(middle);
    statsPanel.current?.resize(stats);
  };

  const exportData: PanelContextType = {
    pausesPanel,
    middlePanel,
    statsPanel,
    pausesPanelSize,
    middlePanelSize,
    statsPanelSize,
    toggleStatsPanel,
    resetPanelSizes,
    setPanelSizes,
  };

  return (
    <PanelContext.Provider value={exportData}>{children}</PanelContext.Provider>
  );
}

export default PanelContextComponent;