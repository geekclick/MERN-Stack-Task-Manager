import Tasks from "@/components/Task/Tasks";
import TaskHeader from "@/components/Task/TaskHeader";
import TaskStatus from "@/components/Task/TaskStatus";
import login from "@/assets/loginAlert.png";

function Dashboard() {
  const hasToken = localStorage.getItem("token") !== null;
  if (hasToken) {
    return (
      <>
        <TaskHeader />
        <TaskStatus />
        <Tasks />
      </>
    );
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={login} alt="login" />
      <h1 className="text-center text-2xl">
        Please Login to see your personalized tasks
      </h1>
    </div>
  );
}

export default Dashboard;
