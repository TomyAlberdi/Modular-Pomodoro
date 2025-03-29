import { CommandDialog } from "@/components/ui/command";
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

  return (
    <CommandDialog open={Open} onOpenChange={setOpen}>
      ey
    </CommandDialog>
  );
};
export default CommandMenu;
