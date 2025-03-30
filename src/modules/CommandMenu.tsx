import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { useTimerContext } from "@/context/UseTimerContext";
import { PauseCircle, PlayCircle, RotateCcw, SquarePen } from "lucide-react";
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

  const { isRunning, isStarted, startTimer, pauseTimer, resumeTimer } =
    useTimerContext();

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

  // TODO: Implement arrow navigation and enter execution for commands

  return (
    <CommandDialog open={Open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
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
        {/* TODO: Implement reset timer command functionality */}
        <CommandItem>
          <RotateCcw />
          <span>Reset Timer</span>
        </CommandItem>
        <CommandItem disabled>
          <SquarePen />
          <span>Update Timer Values</span>
        </CommandItem>
      </CommandGroup>
    </CommandDialog>
  );
};
export default CommandMenu;
