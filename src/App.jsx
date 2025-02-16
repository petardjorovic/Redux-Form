import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUserAction } from "./store/UserSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.hasOwnProperty("user")) {
      dispatch(restoreUserAction(localStorage.getItem("user")));
    }
  }, []);
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
