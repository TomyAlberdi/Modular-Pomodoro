import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";
import {
  Eye,
  EyeOff,
  Grid2x2Check,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  SkipForward,
} from "lucide-react";
import { useEffect } from "react";

interface CommandMenuProps {
  Open: boolean;
  setOpen: (Open: boolean) => void;
}

const CommandMenu = ({ Open, setOpen }: CommandMenuProps) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!Open);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isRunning,
    isStarted,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipTimer,
  } = useTimerContext();

  const handleStartCommand = () => {
    if (!isStarted) {
      startTimer();
    } else if (isRunning) {
      pauseTimer();
    } else {
      resumeTimer();
    }
    setOpen(false);
  };

  const {
    resetPanelSizes,
    pausesPanelSize,
    togglePausePanel,
    statsPanelSize,
    toggleStatsPanel,
    variablesPanelSize,
    toggleVariablesPanel,
    streakPanelSize,
    toggleStreakPanel,
  } = usePanelContext();

  return (
    <CommandDialog open={Open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="custom-scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Timer">
          <CommandItem onSelect={handleStartCommand}>
            {isRunning ? (
              <>
                <PauseCircle />
                <span>Pause Timer</span>
              </>
            ) : isStarted ? (
              <>
                <PlayCircle />
                <span>Resume Timer</span>
              </>
            ) : (
              <>
                <PlayCircle />
                <span>Start Timer</span>
              </>
            )}
            <CommandShortcut>Space</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              skipTimer();
              setOpen(false);
            }}
          >
            <SkipForward />
            <span>Skip Timer</span>
            <CommandShortcut>Ctrl + X</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              resetTimer();
              setOpen(false);
            }}
          >
            <RotateCcw />
            <span>Reset Timer</span>
            <CommandShortcut>Ctrl + Y</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Modules">
          <CommandItem
            onSelect={() => {
              resetPanelSizes();
              setOpen(false);
            }}
          >
            <Grid2x2Check />
            Reset Layout
          </CommandItem>
          <CommandItem onSelect={togglePausePanel}>
            {pausesPanelSize > 0 ? (
              <>
                <EyeOff />
                <span>Hide Pauses Module</span>
              </>
            ) : (
              <>
                <Eye />
                <span>Show Pauses Module</span>
              </>
            )}
          </CommandItem>
          <CommandItem onSelect={toggleStatsPanel}>
            {statsPanelSize > 0 ? (
              <>
                <EyeOff />
                <span>Hide Stats Module</span>
              </>
            ) : (
              <>
                <Eye />
                <span>Show Stats Module</span>
              </>
            )}
          </CommandItem>
          <CommandItem onSelect={toggleVariablesPanel}>
            {variablesPanelSize > 0 ? (
              <>
                <EyeOff />
                <span>Hide Variables Module</span>
              </>
            ) : (
              <>
                <Eye />
                <span>Show Variables Module</span>
              </>
            )}
          </CommandItem>
          <CommandItem onSelect={toggleStreakPanel}>
            {streakPanelSize > 0 ? (
              <>
                <EyeOff />
                <span>Hide Streak Module</span>
              </>
            ) : (
              <>
                <Eye />
                <span>Show Streak Module</span>
              </>
            )}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
export default CommandMenu;
