import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/signup";
import Verify from "./components/Verify";
import Play from "./components/Play";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";

function App() {
  return (
    <>
      <Router basename="/ttt">
        <CustomNavbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/verify" exact element={<Verify />} />
          <Route path="/play" exact element={<Play />} />
          <Route path="/listgame" exact element={<GameList />} />
          <Route path="/gamedetails" exact element={<GameDetails />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
