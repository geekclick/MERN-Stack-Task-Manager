import { useLocation } from "react-router-dom";

function useCurrentPath(n: number) {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[n];
  return currentPath;
}

export default useCurrentPath;
