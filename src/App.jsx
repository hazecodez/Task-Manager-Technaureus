import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import TaskList from "./Pages/TaskList";
import Profile from "./Pages/Profile";
import Public from "./Middlewares/Public";
import Protect from "./Middlewares/Protected";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/"
            element={
              <Protect>
                <TaskList />
              </Protect>
            }
          />
          <Route
            path="/profile"
            element={
              <Protect>
                <Profile />
              </Protect>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
