import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { ChildrenProps } from "@/interfaces/task-interfaces";
import { RootState } from "@/store";
import { Clock, UserPlus } from "lucide-react";
import { peerRequest } from "@/services/peer-services";

function AddPeer({ children }: ChildrenProps) {
  const [username, setUsername] = useState("");
  const [reciverId, setReciverId] = useState("");
  const [addButton, setAddButton] = useState(true);
  const userList = useSelector((state: RootState) => state.authSlice.userList);
  // console.log(userList);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    peerRequest(reciverId, e);
    setUsername("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Work together with peers</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-10"
        >
          <div className=" space-y-2">
            <Label>Find your peers</Label>
            <Input
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col space-y-4">
            {userList
              .filter((user) => user.username === username)
              .map((item) => (
                <div className="flex justify-between items-center px-4 border rounded-lg bg-gray-300">
                  <h1 className="text-center font-bold">{item.username}</h1>
                  {addButton ? (
                    <Button
                      onClick={() => {
                        setReciverId(item._id);
                        setAddButton(false);
                      }}
                      className="bg-transperent border-none hover:bg-transparent text-black"
                      type="submit"
                    >
                      <UserPlus />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setReciverId("");
                        setAddButton(true);
                      }}
                      className="bg-transperent border-none hover:bg-transparent text-black"
                      type="submit"
                    >
                      <Clock />
                    </Button>
                  )}
                </div>
              ))}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPeer;
