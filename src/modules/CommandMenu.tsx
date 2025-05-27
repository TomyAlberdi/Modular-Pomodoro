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
  Github,
  Grid2x2Check,
  ListRestart,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  SkipForward,
  Trash2,
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
    resetStats,
    deleteAllTasks,
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

  const { resetPanelSizes } = usePanelContext();

  const handleOpenCreatorWebsite = () => {
    window.open("https://www.tomas-alberdi.work/", "_blank");
  };

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
            <CommandShortcut>Ctrl + Space</CommandShortcut>
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
        </CommandGroup>
        <CommandGroup heading="Tasks">
          <CommandItem
            onSelect={() => {
              deleteAllTasks();
              setOpen(false);
            }}
          >
            <Trash2 />
            Delete All Tasks
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Data">
          <CommandItem
            onSelect={() => {
              resetStats();
              setOpen(false);
            }}
          >
            <ListRestart />
            Reset Stats
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Creator">
          <CommandItem onSelect={handleOpenCreatorWebsite}>
            <Github />
            Made with 🍉 by <span className="italic">@TomyAlberdi</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
export default CommandMenu;
