import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProject from "../Project/AddProject";
import { ChildrenProps, Project, Task } from "@/interfaces/task-interfaces";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FormEvent, useRef, useState } from "react";
import { handleChange } from "@/helpers/handleChange";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { addTask } from "@/services/task-services";
import useChangeColor from "@/hooks/useChangeColor";

function NewTask({ children }: ChildrenProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    tags: [],
    project: "",
    assigned_to: [],
    task_status: "",
  });
  const projects = useSelector(
    (state: RootState) => state.projectSlice.projects
  );

  const [statusColor, setStatusColor] = useState("gray");
  useChangeColor(task, setStatusColor, false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(task);
    setTask({
      title: "",
      description: "",
      tags: [],
      project: "",
      assigned_to: [],
      task_status: "",
    });
    if (closeRef.current) {
      closeRef.current.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#2a2d32] border-none text-white h-[90vh] rounded-lg lg:w-[90em] p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:space-y-10 space-y-3 rounded-lg">
            <div>
              <Textarea
                className="bg-transparent text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0 border-none resize-none"
                value={task?.title}
                placeholder="Mobile Task Manager App"
                name="title"
                onChange={(e) => handleChange(e, setTask)}
              />
              <div className="flex mx-3 items-center">
                <p className="text-sm font-semibold text-gray-500">Tags:</p>
                <Input
                  className="bg-transparent text-sm font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-gray-500"
                  value={task?.tags}
                  name="tags"
                  placeholder="React Native, Nodejs, Mongodb"
                  onChange={(e) => handleChange(e, setTask)}
                  required
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
                placeholder="Create a mobile application for task management with features like creating tasks, setting deadlines, and prioritizing."
                value={task?.description}
              />
            </div>
          </div>
          <Button
            variant={"ghost"}
            type="submit"
            size={"sm"}
            className="absolute bottom-8 right-8"
          >
            Create
          </Button>
          <DialogClose asChild>
            <Button
              ref={closeRef}
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

export default NewTask;
