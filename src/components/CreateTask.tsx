import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTimerContext } from "@/context/UseTimerContext";
import { useState } from "react";
import { Task as TaskType } from "@/interfaces/Interfaces";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const CreateTask = () => {
  const { addTask } = useTimerContext();
  //TODO: Implement Enter key to create task faster
  const [Open, setOpen] = useState(false);
  const [Task, setTask] = useState<TaskType>({ text: "", completed: false });

  const handleAddTask = () => {
    const result = addTask(Task);
    if (result === true) {
      setOpen(false);
      return;
    }
    toast.error("Error creating task.", {
      description: result,
    });
  };

  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Add a new task to your list.</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder="What needs to be done?"
            className="w-full"
            onChange={(e) => setTask({ ...Task, text: e.target.value })}
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full cursor-pointer"
            onClick={() => handleAddTask()}
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTask;
