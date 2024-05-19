import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "@/services/task-services";
import { ChildrenProps, Project } from "@/interfaces/task-interfaces";
import { RootState } from "@/store";
import AddProject from "./AddProject";

function AddTask({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.projectSlice.projects
  );
  const [task, setTask] = useState({
    title: "",
    description: "",
    tags: "",
    project: "",
    assigned_to: [],
    task_status: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    addTask(
      dispatch,
      {
        ...task,
        tags: task.tags.split(" "),
      },
      navigate
    );
    setTask({
      title: "",
      description: "",
      tags: "",
      project: "",
      assigned_to: [],
      task_status: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-4"
        >
          <div className=" space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Task Title"
              type="text"
              name="title"
              value={task.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="Task Description"
              type="text"
              name="description"
              value={task.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Add Tags"
              type="text"
              name="tags"
              value={task.tags}
              onChange={(e) => handleChange(e)}
            />
            <small>(Separated by comma)</small>
          </div>
          <div className=" space-y-2">
            <Label>Project</Label>
            <Select
              onValueChange={(value) => {
                setTask({ ...task, project: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <AddProject>
                  <button>Create new Project</button>
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
          <div className=" space-y-2">
            <Label>Select Status</Label>
            <Select
              onValueChange={(value) => {
                setTask({ ...task, task_status: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogClose asChild>
            <Button type="submit">Add Task</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
