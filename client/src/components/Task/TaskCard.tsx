import { Calendar, DeleteIcon, Target } from "lucide-react";
import { useSelector } from "react-redux";
import { removeTask } from "@/services/task-services";
import { Project, Task } from "@/interfaces/task-interfaces";
import { parseDate } from "@/helpers/parseDate";
import { RootState } from "@/store";
import TaskPreview from "./TaskPreview";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useChangeColor from "@/hooks/useChangeColor";

function TaskCard(props: Task) {
  const [task, setTask] = useState<Task>({ ...props });
  const projects = useSelector(
    (state: RootState) => state.projectSlice.projects
  );
  const taskProject: Project = projects.filter(
    (item: Project) => item._id === props.project
  )[0];
  const [statusColor, setStatusColor] = useState("gray");
  useChangeColor(task, setStatusColor, true);
  return (
    <div className="flex flex-col gap-4 p-[20px] bg-[#2A2D32] w-full hover:shadow-xl hover:scale-110 transition-all rounded-[16px] h-fit cursor-pointer">
      <div className="flex justify-between gap-8">
        {/* task header */}
        <h1 className="text-white text-[14px] font-poppins font-semibold">
          {props.title[0]?.toUpperCase() + props.title?.slice(1)}
        </h1>
        <div className="flex space-x-2 w-10">
          <DeleteIcon
            className="text-red-500"
            onClick={async () => removeTask(props)}
            role="button"
          />
        </div>
      </div>
      <div className="flex flex-col md:w-[215px] w-fit space-y-3">
        {/* task body */}
        <TaskPreview {...props}>
          <div>
            <p className="text-[#6C717B] text-[14px] font-poppins w-[80%]">
              {props.description?.length > 24
                ? props.description[0]?.toUpperCase() +
                  props.description?.slice(1, 30) +
                  "..."
                : props.description[0]?.toUpperCase() +
                  props.description?.slice(1)}
            </p>
            <div className="flex gap-2 py-3 flex-wrap">
              {Array.isArray(props.tags)
                ? props.tags?.map((tag: string, i: number) =>
                    tag != "" ? (
                      <Badge
                        key={i}
                        className="bg-purple-600 py-px md:text-[10px] text-[10px] font-normal w-fit"
                      >
                        {tag}
                      </Badge>
                    ) : null
                  )
                : null}
            </div>

            <div className="text-[15px] text-[#6C717B] space-y-2  ">
              <div className="flex gap-3">
                <Calendar width={20} />
                <p>{parseDate(props.createdDate?.toString() || "")}</p>
              </div>
              <div className="flex gap-3">
                <Target width={20} />
                <p>{taskProject?.title}</p>
              </div>
            </div>
          </div>
        </TaskPreview>
        <div
          className={`flex gap-2 py-2 justify-start items-center text-[#6C717B] text-[14px]`}
        >
          Status:
          <Select
            onValueChange={(value) => {
              if (task) {
                setTask({ ...task, task_status: value });
              }
            }}
            defaultValue={task?.task_status}
          >
            <SelectTrigger
              className={`bg-transparent text-xs w-[85px] px-0 focus:outline-none focus:ring-0 focus:ring-none focus:ring-offset-0 border-none ${statusColor}`}
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
    </div>
  );
}

export default TaskCard;
