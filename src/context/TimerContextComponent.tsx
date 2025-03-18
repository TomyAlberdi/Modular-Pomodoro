import { ReactNode, useState } from "react";
import { TimerContext, TimerContextType } from "@/context/TimerContext";

interface TimerContextComponentProps {
  children: ReactNode;
}

const TimerContextComponent: React.FC<TimerContextComponentProps> = ({
  children,
}) => {
  const [timerDuration, setTimerDuration] = useState(60);

  const exportData: TimerContextType = {
    timerDuration,
  };

  return (
    <TimerContext.Provider value={exportData}>{children}</TimerContext.Provider>
  );
};

export default TimerContextComponent;