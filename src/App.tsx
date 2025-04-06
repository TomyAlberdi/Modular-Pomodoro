import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Tasks from "@/modules/Tasks";
import Stats from "@/modules/Stats";
import Streak from "@/modules/Streak";
import Timer from "@/modules/Timer";
import Variables from "@/modules/Variables";
import CommandMenu from "@/modules/CommandMenu.tsx";
import FloatingAdvice from "@/components/FloatingAdvice";
import { useTimerContext } from "@/context/UseTimerContext";
import { useEffect, useState } from "react";
import { usePanelContext } from "@/context/UsePanelContext";

function App() {
  const {
    isRunning,
    isStarted,
    startTimer,
    pauseTimer,
    resumeTimer,
    currentType,
    skipTimer,
    resetTimer,
  } = useTimerContext();

  useEffect(() => {
    const pause = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "Spacebar") && (e.metaKey || e.ctrlKey)) {
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
    const skip = (e: KeyboardEvent) => {
      if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        skipTimer();
      }
    };
    const reset = (e: KeyboardEvent) => {
      if (e.key === "y" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        resetTimer();
      }
    };
    document.addEventListener("keydown", pause);
    document.addEventListener("keydown", skip);
    document.addEventListener("keydown", reset);
    return () => {
      document.removeEventListener("keydown", pause);
      document.removeEventListener("keydown", skip);
      document.removeEventListener("keydown", reset);
    };
  }, [
    isStarted,
    isRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
    skipTimer,
    resetTimer,
  ]);

  const [CommandMenuOpen, setCommandMenuOpen] = useState(false);

  const { middlePanelSize, middlePanel } = usePanelContext();

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
      autoSaveId={"horizontalPanelGroup"}
    >
      <Tasks />
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={middlePanelSize}
        minSize={25}
        ref={middlePanel}
        className="border-x flex justify-center items-center"
      >
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-screen"
          autoSaveId={"verticalPanelGroup"}
        >
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
