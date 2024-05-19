import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProject from "./AddProject";
import { Project, Task } from "@/interfaces/task-interfaces";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { handleChange } from "@/helpers/handleChange";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { editTask } from "@/services/task-services";

function TaskPreview({ children, ...prop }: React.PropsWithChildren<Task>) {
  const dispatch = useDispatch();
  const [task, setTask] = useState<Task>({ ...prop });
  const projects = useSelector(
    (state: RootState) => state.projectSlice.projects
  );

  const [statusColor, setStatusColor] = useState("gray");
  useEffect(() => {
    const changeColor = () => {
      if (task?.task_status === "ongoing") {
        setStatusColor("blue");
      }
      if (task?.task_status === "completed") {
        setStatusColor("green");
      }
      if (task?.task_status === "upcoming") {
        setStatusColor("yellow");
      }
      if (task?.task_status === "paused") {
        setStatusColor("red");
      }
    };
    changeColor();
  }, [task?.task_status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTask(dispatch, task);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#2a2d32] border-none text-white h-[90vh] rounded-lg lg:w-[90em] p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:space-y-10 space-y-4 rounded-lg">
            <div>
              <Textarea
                className="bg-transparent text-2xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0 border-none h-fit resize-none"
                value={task?.title}
                placeholder="Title"
                name="title"
                onChange={(e) => handleChange(e, setTask)}
              />
              <div className="flex mx-3 items-center">
                <p className="text-sm font-semibold text-gray-500">Tags:</p>
                <Input
                  className="bg-transparent text-sm font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-gray-500"
                  value={task?.tags}
                  name="tags"
                  placeholder="sql, python"
                  onChange={(e) => handleChange(e, setTask)}
                />
              </div>
              <div className=" space-y-4 lg:my-8 my-5">
                <div className="flex flex-col justify-center">
                  <p className="text-sm mx-3 font-semibold text-gray-500">
                    Status
                  </p>
                  <Select
                    onValueChange={(value) => {
                      if (task) {
                        setTask({ ...task, task_status: value });
                      }
                    }}
                    defaultValue={task?.task_status}
                  >
                    <SelectTrigger
                      className={`bg-transparent text-base font-semibold focus:outline-none focus:ring-0 focus:ring-none focus:ring-offset-0 border-none text-${statusColor}-500`}
                    >
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="text-sm font-semibold">
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className=" space-y-2">
                <div className="flex flex-col justify-center">
                  <p className="text-sm mx-3 font-semibold text-gray-500">
                    Project
                  </p>
                  <Select
                    onValueChange={(value) => {
                      if (task) {
                        setTask({ ...task, project: value });
                      }
                    }}
                    defaultValue={task?.project}
                  >
                    <SelectTrigger className="bg-transparent text-base font-semibold focus:outline-none focus:ring-0 focus:ring-none focus:ring-offset-0 border-none text-white">
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent className="text-sm font-semibold">
                      <AddProject>
                        <button className="ml-8">Create new Project</button>
                      </AddProject>
                      {projects.map((project: Project, i) => {
                        return (
                          <SelectItem key={i} value={project?._id || ""}>
                            {project?.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center h-full">
              <p className="text-sm mx-3 font-semibold text-gray-500">
                Description
              </p>
              <Textarea
                name="description"
                onChange={(e) => handleChange(e, setTask)}
                className="bg-[#2a2d32] border-none h-[20vh] focus-visible:ring-0 focus-visible:ring-offset-0 font-poppins resize-none"
                placeholder="Description"
                value={task?.description}
                autoFocus
              />
            </div>
          </div>
          <DialogClose asChild>
            <Button
              variant={"ghost"}
              type="submit"
              size={"sm"}
              className="absolute bottom-8 right-8"
            >
              Save
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"ghost"}
              type="button"
              className="absolute bottom-8 border-none"
            >
              Cancel
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskPreview;
