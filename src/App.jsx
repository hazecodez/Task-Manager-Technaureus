import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import TaskList from "./Pages/TaskList";
import Profile from "./Pages/Profile";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<TaskList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}
