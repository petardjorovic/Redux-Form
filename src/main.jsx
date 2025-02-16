import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuarding from "./utils/AuthGuarding.jsx";
import AuthGuardingRegister from "./utils/AuthGuardingRegister.jsx";

// * redux
import { Provider } from "react-redux";
import store from "./store/store.js";

// * pages
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: (
          <AuthGuarding>
            <ProfilePage />
          </AuthGuarding>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGuardingRegister>
            <RegisterPage />
          </AuthGuardingRegister>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
