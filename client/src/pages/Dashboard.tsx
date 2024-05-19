import Tasks from "@/components/Tasks";
import TaskHeader from "@/components/TaskHeader";
import TaskStatus from "@/components/TaskStatus";

function Dashboard() {
  const hasToken = localStorage.getItem("token") !== null;
  return (
    <>
      <TaskHeader />
      <TaskStatus />
      {hasToken ? (
        <Tasks />
      ) : (
        <h1 className="text-center m-auto text-2xl">
          Please Login to see your personalized tasks
        </h1>
      )}
    </>
  );
}

export default Dashboard;
