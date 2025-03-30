import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Pauses from "@/modules/Pauses";
import Stats from "@/modules/Stats";
import Streak from "@/modules/Streak";
import Timer from "@/modules/Timer";
import Variables from "@/modules/Variables";
import CommandMenu from "@/modules/CommandMenu.tsx";
import FloatingAdvice from "@/components/FloatingAdvice";
import { useTimerContext } from "@/context/UseTimerContext";
import { useEffect, useState } from "react";

function App() {
  const {
    isRunning,
    isStarted,
    startTimer,
    pauseTimer,
    resumeTimer,
    currentType,
  } = useTimerContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        if (!isStarted) {
          startTimer();
        } else if (isRunning) {
          pauseTimer();
        } else {
          resumeTimer();
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [isStarted, isRunning, startTimer, pauseTimer, resumeTimer]);

  const [CommandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={
        "App min-h-screen min-w-screen flex justify-center items-center overflow-hidden transition-colors duration-500 ease-linear " +
        (!isRunning
          ? "bg-timer-idle"
          : currentType === "pomodoro"
          ? "bg-timer-pomodoro"
          : currentType === "shortBreak"
          ? "bg-timer-short-break"
          : "bg-timer-long-break")
      }
    >
      <Pauses />
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={34}
        minSize={25}
        className="border-x flex justify-center items-center"
      >
        <ResizablePanelGroup direction="vertical" className="min-h-screen">
          <Variables />
          <ResizableHandle withHandle />
          <Timer />
          <ResizableHandle withHandle />
          <Streak />
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <Stats />
      <CommandMenu Open={CommandMenuOpen} setOpen={setCommandMenuOpen} />
      <FloatingAdvice Open={CommandMenuOpen} setOpen={setCommandMenuOpen} />
    </ResizablePanelGroup>
  );
}

export default App;
