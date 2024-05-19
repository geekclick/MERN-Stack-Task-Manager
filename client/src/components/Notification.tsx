import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearNotification } from "@/services/notification-services";
import { RootState } from "@/store";
import { BellDot } from "lucide-react";
import { useSelector } from "react-redux";

function Notification() {
  const userList = useSelector((state: RootState) => state.authSlice.userList);
  if (localStorage.getItem("userId"))
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BellDot className="text-yellow-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* {userList
            .filter((users) => users._id === user.notifications[0])
            .map((item) => (
              <>
                <DropdownMenuLabel>
                  {item.username} sent you peer request
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => addPeer(item._id)}>
                  Accept
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clearNotification}>
                  Reject
                </DropdownMenuItem>
              </>
            ))} */}
        </DropdownMenuContent>
      </DropdownMenu>
    );
}

export default Notification;
