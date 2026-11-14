import "./index.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import TasksPage from "./pages/tasks";

export function App() {
  console.log(process.env.BUN_PUBLIC_API_URL)
  return (
    <>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
