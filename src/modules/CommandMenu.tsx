import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useTimerContext } from "@/context/UseTimerContext";
import {
  PauseCircle,
  PlayCircle,
  RotateCcw,
  SkipForward,
  SquarePen,
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

  return (
    <CommandDialog open={Open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
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
          <CommandItem disabled>
            <SquarePen />
            <span>Update Timer Values</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
export default CommandMenu;
