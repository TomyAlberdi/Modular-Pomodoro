import { ResizablePanel } from "@/components/ui/resizable";
import { useTimerContext } from "@/context/UseTimerContext";

const Streak = () => {
  const { pomodoroCount } = useTimerContext();

  return (
    <ResizablePanel className="flex justify-center items-center">
      Completed Pomodoros: {pomodoroCount}
    </ResizablePanel>
  );
};
export default Streak;
