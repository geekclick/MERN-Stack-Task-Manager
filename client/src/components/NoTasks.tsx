import notask from "@/assets/no-tasks.png";

function NoTasks() {
  return (
    <div className="m-auto w-1/2">
      <img src={notask} alt="IMAGE" className="w-full h-full" />
      <h1 className="text-center text-2xl">There are no tasks for now!</h1>
    </div>
  );
}

export default NoTasks;
