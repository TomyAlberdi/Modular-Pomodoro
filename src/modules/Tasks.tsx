import { ResizablePanel } from "@/components/ui/resizable";
import { usePanelContext } from "@/context/UsePanelContext";
import { useTimerContext } from "@/context/UseTimerContext";
import CreateTask from "@/components/CreateTask";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CircleCheck, CircleX, Trash2 } from "lucide-react";

const Tasks = () => {
  const { tasksPanelSize, tasksPanel } = usePanelContext();
  const { tasks, toggleTask, deleteTask } = useTimerContext();

  return (
    <ResizablePanel
      ref={tasksPanel}
      defaultSize={tasksPanelSize}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex justify-between items-center mb-5 w-2/3 min-w-90">
        <span className="text-xl">
          {!tasks || tasks.length === 0 ? "No tasks added yet." : "Tasks"}
        </span>
        <CreateTask />
      </div>
      <div className="w-2/3 flex flex-col gap-5 min-w-90">
        {tasks?.map((task, index) => {
          return (
            <article
              key={index}
              className="flex justify-between items-start gap-5"
            >
              <span
                className={`text-sm ${
                  task.completed ? "text-gray-400 line-through" : ""
                }`}
              >
                {task.text}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => toggleTask(task)}
                    >
                      {task.completed ? (
                        <>
                          <CircleX />
                          <span>Uncomplete</span>
                        </>
                      ) : (
                        <>
                          <CircleCheck />
                          <span>Complete</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => deleteTask(task)}
                    >
                      <Trash2 />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </article>
          );
        })}
      </div>
    </ResizablePanel>
  );
};
export default Tasks;
