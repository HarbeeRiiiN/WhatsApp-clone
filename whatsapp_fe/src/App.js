import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice.js";

function App() {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="dark">
      {/* <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Clcik Me!
      </button> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
