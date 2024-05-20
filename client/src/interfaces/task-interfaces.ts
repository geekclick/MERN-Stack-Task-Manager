export interface ChildrenProps {
  children: React.ReactNode;
  prop?: Task;
}
export interface DashboardLink {
  label: string;
  icon: JSX.Element;
  link: string;
}
export interface Link {
  name: string;
  link: string;
}
export interface Layout {
  title: string;
  links: Link[];
}
export interface RootState {
  authSlice: AuthState;
}
export interface User {
  _id: any;
  username: string;
  email: string;
  password: string;
  projects: Project[];
  peers: string[];
  notifications: string[];
}
export interface AuthState {
  isLoggedIn: boolean;
  user: User;
  userList: User[];
}
export interface SidebarState {
  sidebarOpen: Boolean;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  project: string;
  assigned_to: string[];
  task_status: string;
  createdDate?: string;
}
export interface TaskList {
  tasks: Task[];
}

export interface StatusColor {
  status: string;
  color: string;
}

export interface statusCount {
  status: string;
  count: Number;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  budget: string;
  owner: string;
  related_tasks: Task[];
  start_date: string;
  end_date: string;
}
export interface ProjectList {
  map(
    arg0: (item: any, i: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  projects: Project[];
}
