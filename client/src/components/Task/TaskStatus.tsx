import { Task } from "@/interfaces/task-interfaces";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

let taskStatus = [
  { status: "OnGoing", color: "blue" },
  { status: "Completed", color: "green" },
  { status: "Upcoming", color: "yellow" },
  { status: "Paused", color: "red" },
];

function TaskStatus() {
  const statusCount: { [status: string]: number } = {}; // Initialize status count object
  const tasks = useSelector((state: RootState) => state.taskSlice.tasks);
  tasks.forEach((task: Task) => {
    const status = task.task_status;
    // Check if status exists in statusCount, if not initialize it to 1, else increment the count
    if (statusCount[status]) {
      statusCount[status] += 1;
    } else {
      statusCount[status] = 1;
    }
  });
  return (
    <div className="lg:flex lg:flex-row grid grid-cols-2 lg:gap-[149px]">
      {taskStatus.map((task, i) => {
        return (
          <div key={i} className="flex gap-2 items-center">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: `${task.color}` }}
            ></div>
            <p className="text-white font-poppins text-[16px]">{task.status}</p>
            <p className="text-[#6C717B] font-poppins text-[14px]">
              {statusCount[task.status.toLowerCase()] || 0}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TaskStatus;
