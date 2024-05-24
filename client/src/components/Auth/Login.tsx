import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { setUser } from "@/store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { ChildrenProps } from "@/interfaces/task-interfaces";
import authServices from "@/services/auth-services";
import { useDispatch } from "react-redux";

function Login({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(true);
  const [userInfo, setUserInfo] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    projects: [],
    peers: [],
    notifications: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return login ? (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col space-y-10 mt-10"
          onSubmit={(e) => authServices.login(userInfo, navigate, dispatch, e)}
        >
          <div>
            <Label>Username</Label>
            <Input
              placeholder="Username"
              name="username"
              type="text"
              value={userInfo.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              placeholder="********"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit">Log In</Button>
          </DialogClose>
        </form>
        <button
          onClick={() => {
            setLogin(false);
            setUser({
              _id: "",
              username: "",
              email: "",
              password: "",
              projects: [],
              peers: [],
              notifications: [],
            });
          }}
        >
          Don't Have Account? <b>Sign Up</b>
        </button>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col space-y-10 mt-10"
          onSubmit={(e) => authServices.signup(userInfo, navigate, dispatch, e)}
        >
          <div>
            <Label>Username</Label>
            <Input
              placeholder="Username"
              name="username"
              type="text"
              value={userInfo.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              placeholder="********"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit">Sign Up</Button>
          </DialogClose>
        </form>
        <button
          onClick={() => {
            setLogin(true);
            setUser({
              _id: "",
              username: "",
              email: "",
              password: "",
              projects: [],
              peers: [],
              notifications: [],
            });
          }}
        >
          Already Have account? <b>Log In</b>
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
