import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./Layouts/Dashboard";
import Form from "./Components /Form";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Form />} /> {/* Default to Form */}
          <Route path="dashboard" element={<Dashboard />} />{" "}
          {/* Hidden route */}
        </Route>
      </Routes>
    </Router>
  );
}
