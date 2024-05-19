import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from "lucide-react";
import { Task } from "@/interfaces/task-interfaces";
import { sort } from "@/helpers";

function Sort() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const taskList: Task[] = useSelector(
    (state: RootState) => state.taskSlice.tasks
  );

  useEffect(() => {
    if (value) {
      sort(value, taskList, dispatch);
    }
  }, [value]);

  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="lg:w-[105px] w-[80px] bg-transparent">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nameA">
          Name <ArrowUpAZ className="w-4 inline-block" />
        </SelectItem>
        <SelectItem value="nameD">
          Name <ArrowDownAZ className="w-4 inline-block" />
        </SelectItem>
        <SelectItem value="dateA">
          Date <ArrowUp01 className="w-4 inline-block" />
        </SelectItem>
        <SelectItem value="dateD">
          Date <ArrowDown01 className="w-4 inline-block" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Sort;
