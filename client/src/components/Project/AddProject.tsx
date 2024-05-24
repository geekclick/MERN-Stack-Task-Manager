import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChildrenProps } from "@/interfaces/task-interfaces";
import { addProject } from "@/services/project-sevices";

function AddProject({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    title: "",
    description: "",
    budget: "",
    owner: "",
    related_tasks: [],
    start_date: "",
    end_date: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    addProject(dispatch, project, navigate, e);
    setProject({
      title: "",
      description: "",
      budget: "",
      owner: "",
      related_tasks: [],
      start_date: "",
      end_date: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-4"
        >
          <div className=" space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Project Title"
              type="text"
              name="title"
              value={project.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="Project Description"
              type="text"
              name="description"
              value={project.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Project Budget</Label>
            <Input
              placeholder="$1200"
              type="number"
              name="budget"
              value={project.budget}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              name="start_date"
              value={project.start_date}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" space-y-2">
            <Label>End Date</Label>
            <Input
              type="date"
              name="end_date"
              value={project.end_date}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit">Add Project</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProject;
