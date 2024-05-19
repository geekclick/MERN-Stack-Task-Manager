import { Calendar, DeleteIcon, PencilLine, Target } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "@/services/task-services";
import { Project, StatusColor, Task } from "@/interfaces/task-interfaces";
import { parseDate } from "@/helpers/parseDate";
import { RootState } from "@/store";
import TaskPreview from "./TaskPreview";

const status_color: StatusColor[] = [
  {
    status: "ongoing",
    color: "text-blue-500",
  },
  {
    status: "completed",
    color: "text-green-500",
  },
  {
    status: "upcoming",
    color: "text-yellow-500",
  },
  {
    status: "paused",
    color: "text-red-500",
  },
];

function TaskCard(props: Task) {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.projectSlice.projects
  );
  const taskProject = projects.filter(
    (item: Project) => item._id === props.project
  )[0];
  return (
    <TaskPreview {...props}>
      <div className="flex flex-col gap-4 p-[20px] bg-[#2A2D32] w-full hover:shadow-xl hover:scale-110 transition-all rounded-[16px] h-fit cursor-pointer">
        <div className="flex justify-between gap-8">
          {/* task header */}
          <h1 className="text-white text-[14px] font-poppins font-semibold">
            {props.title[0].toUpperCase() + props.title.slice(1)}
          </h1>
          <div className="flex space-x-2 w-10">
            <DeleteIcon
              className="text-red-500"
              onClick={async () => removeTask(dispatch, props)}
              role="button"
            />
          </div>
        </div>
        <div className="flex flex-col md:w-[215px] w-fit space-y-3">
          {/* task body */}
          <p className="text-[#6C717B] text-[14px] font-poppins w-[80%]">
            {props.description.length > 50
              ? props.description[0].toUpperCase() +
                props.description.slice(1, 19) +
                "..."
              : props.description[0].toUpperCase() + props.description.slice(1)}
          </p>
          {/* <div className="flex gap-2 py-3 flex-wrap">
          {props.tags.split(",").map((tag: string, i: number) => {
            return (
              <Badge
                key={i}
                className="bg-purple-600 py-px md:text-[8px] text-[10px] font-normal w-fit"
              >
                {tag}
              </Badge>
            );
          })}
        </div> */}
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
          <div
            className={`flex gap-2 py-2 justify-start items-center text-[#6C717B] text-[14px]`}
          >
            Status:{" "}
            {status_color
              .filter(
                (ntask: StatusColor) => ntask.status === props.task_status
              )
              .map((task, i) => (
                <p
                  key={i}
                  className={` ${task.color} font-poppins text-[12px] capitalize `}
                >
                  {task.status}
                </p>
              ))}
          </div>
        </div>
        {/* <div className="flex justify-between border-t pt-3 border-[#323539] items-center">
        <div className="flex -space-x-6">
          {images.map((image, i) => {
            return (
              <Avatar key={i}>
                <AvatarImage src={image.src} className="w-7 h-7" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            );
          })}
        </div>
        <div className="flex gap-1 items-center cursor-pointer text-[#6C717B]">
          <Paperclip width={14} />
          <p className="font-poppins text-[14px]">2</p>
        </div>
      </div> */}
      </div>
    </TaskPreview>
  );
}

export default TaskCard;
