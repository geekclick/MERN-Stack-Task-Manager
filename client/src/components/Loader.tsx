import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[260px] w-[250px] rounded-xl" />
    </div>
  );
}
