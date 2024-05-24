import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import Login from "./Login";
import { Button } from "../ui/button";
import { ChildrenProps } from "@/interfaces/task-interfaces";

function LoginAlert({ children }: ChildrenProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please Login First</DialogTitle>
          <DialogDescription>
            Login is neccessary to create new task. Please login by clicking
            below login button
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Login>
            <Button className="bg-primary">Log in</Button>
          </Login>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginAlert;
