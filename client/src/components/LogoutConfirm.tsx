import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChildrenProps } from "@/interfaces/task-interfaces";
import authServices from "@/services/auth-services";
import { useDispatch } from "react-redux";

const LogoutConfirm: React.FC<ChildrenProps> = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-dark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you sure you wish to logout?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            You will be log out from your account. You have to enter your
            password to log in into your account next time
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction onClick={() => authServices.logout(dispatch)}>
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirm;
