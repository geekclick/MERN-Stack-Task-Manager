import { parseDate } from "@/helpers/parseDate";
import { Project } from "@/interfaces/task-interfaces";
import { removeProject } from "@/services/project-sevices";
import {
  Calendar,
  DeleteIcon,
  IndianRupee,
  PencilLine,
  Target,
} from "lucide-react";
import { useDispatch } from "react-redux";

function ProjectCard(props: Project) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-4 p-[20px] bg-[#2A2D32] w-full rounded-[16px] h-fit">
      <div className="flex justify-between gap-8">
        {/* task header */}
        <h1 className="text-white text-[14px] font-poppins font-semibold">
          {props.title[0].toUpperCase() + props.title.slice(1)}
        </h1>
        <div className="flex space-x-2 w-10">
          {/* <EditTask {...props}> */}
          <PencilLine role="button" />
          {/* </EditTask> */}
          <DeleteIcon
            className="text-red-500"
            onClick={() => removeProject(dispatch, props)}
            role="button"
          />
        </div>
      </div>
      <div className="flex flex-col md:w-[215px] w-fit space-y-3">
        {/* task body */}
        <p className="text-[#6C717B] text-[14px] font-poppins w-full">
          {props.description.length > 50
            ? props.description[0].toUpperCase() +
              props.description.slice(1, 24) +
              "..."
            : props.description[0].toUpperCase() + props.description.slice(1)}
        </p>
        <div className="flex gap-2 py-3 flex-wrap justify-start items-center">
          <p className="text-sm flex">
            <IndianRupee className="scale-50" /> Budget:
          </p>
          <p>{props.budget}</p>
        </div>
        <div className="text-[15px] text-[#6C717B] space-y-2  ">
          <div className="flex gap-3">
            <Calendar width={20} />
            <p>{parseDate(props.start_date?.toString() || "")}</p>
          </div>
          <div className="flex gap-3">
            <Calendar width={20} />
            <p>{parseDate(props.end_date?.toString() || "")}</p>
          </div>
          <div className="flex gap-3">
            {/* <Target width={20} /> */}
            {/* <p>{props.related_tasks}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
