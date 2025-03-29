import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useTimerContext } from "@/context/UseTimerContext";
import { PauseCircle, PlayCircle, RotateCcw, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

const CommandMenu = () => {
  const [Open, setOpen] = useState(false);
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

  const { isRunning, isStarted } = useTimerContext();

  return (
    <CommandDialog open={Open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Timer">
        <CommandItem>
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
        </CommandItem>
        <CommandItem>
          <RotateCcw />
          <span>Reset Timer</span>
        </CommandItem>
        <CommandItem>
          <SquarePen />
          <span>Update Timer</span>
        </CommandItem>
      </CommandGroup>
    </CommandDialog>
  );
};
export default CommandMenu;
