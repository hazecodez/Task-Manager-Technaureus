import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import TaskList from "./Pages/TaskList";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </Router>
    </>
  );
}
