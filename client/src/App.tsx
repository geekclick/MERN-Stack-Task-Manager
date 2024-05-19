import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import useInit from "./hooks/useInit";

function App() {
  useInit();
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Projects />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
