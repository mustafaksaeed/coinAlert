import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./Layouts/Dashboard";
import Form from "./Components /Form";
import "./App.css";

export default function App() {

  async function mustafaReq() {
    const response = await fetch("http://localhost:3000");
    const text = await response.text();
    console.log(text);
  }
  mustafaReq();
  //async await replacement for callback
  //look into async await callback
  //look into promise in context of async await and callback

  // make http get request
  // on host and port and path
  // host: localhosdt
  // port: 3000
  // path: "/"
  // the request will give a response (from server)
  // console.log the response.

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
