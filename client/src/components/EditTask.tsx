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
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "@/services/task-services";
import { Task } from "@/interfaces/task-interfaces";
import { handleChange } from "@/helpers/handleChange";

function EditTask({ children, ...props }: React.PropsWithChildren<Task>) {
  const dispatch = useDispatch();
  const [task, setTask] = useState(props);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTask(dispatch, task);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-4 "
        >
          <div className=" space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Task Title"
              type="text"
              name="title"
              value={task.title}
              onChange={(e) => handleChange(e, setTask)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="Task Description"
              type="text"
              name="description"
              value={task.description}
              onChange={(e) => handleChange(e, setTask)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Task Tags"
              type="text"
              name="tags"
              value={task.tags}
              onChange={(e) => handleChange(e, setTask)}
            />
            <small>(Separated by comma)</small>
          </div>
          <div className=" space-y-2">
            <Label>Project</Label>
            <Input
              placeholder="Project"
              type="text"
              name="project"
              value={task.project}
              onChange={(e) => handleChange(e, setTask)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Update Status</Label>
            <Select
              onValueChange={(value) => {
                setTask({ ...task, task_status: value });
              }}
              defaultValue={task.task_status}
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
            <Button type="submit">Edit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
