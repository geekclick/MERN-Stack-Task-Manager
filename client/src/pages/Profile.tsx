import Img from "@/assets/profile.png";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { Facebook, Github, Twitter } from "lucide-react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { tasks } = useSelector((state: RootState) => state.taskSlice);

  if (localStorage.getItem("token")) {
    return (
      <section className="p-10 flex flex-col w-full space-y-6 justify-center items-center">
        <div>
          <div className="flex flex-col items-center space-y-8 w-full justify-center">
            <img src={Img} alt="#" width={250} />
            <h2 className="font-bold text-4xl">{user?.username}</h2>{" "}
          </div>
          <div className="text-center my-4 font-light text-gray-50/40">
            @WebDeveloper | Amazon
          </div>
          <div className="flex justify-evenly items-center my-10">
            <div className="w-fit rounded-full border-2 p-1 text-blue-500">
              <Facebook />
            </div>
            <div className="w-fit rounded-full border-2 p-1 text-blue-500">
              <Twitter />
            </div>
            <div className="w-fit rounded-full border-2 p-1 text-blue-500">
              <Github />
            </div>
          </div>
        </div>

        <div>
          <Button className="bg-blue-500 rounded-full border-blue-500 hover:bg-transparent hover:border">
            Message Now
          </Button>
        </div>

        <div className="flex justify-center gap-10 py-10 items-center">
          <div className="text-center">
            <h1 className="text-5xl">{tasks?.length}</h1>{" "}
            <p className="font-thin text-white/50">Total Tasks</p>
          </div>
          <div className="text-center">
            <h1 className="text-5xl">{user?.projects?.length}</h1>{" "}
            <p className="font-thin text-white/50">Total Projects</p>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default Profile;
