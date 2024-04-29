import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Donate from "./pages/Donate";
import Donations from "./pages/Donations";
import Funds from "./pages/Funds";
import Raise from "./pages/Raise";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/raise" element={<Raise />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
