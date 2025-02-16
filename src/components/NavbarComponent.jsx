import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  const { user } = useSelector((state) => state.userStore);
  return (
    <header className="bg-blue-950 md:h-[100px]">
      <nav className="container mx-auto flex flex-col gap-[10px] md:flex-row items-center justify-between h-full">
        <h1 className="text-3xl uppercase text-slate-100 font-bold">
          Redux React
        </h1>
        <ul className="flex items-center gap-[20px]">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            {Object.keys(user).length > 0 ? (
              <NavLink to={"/profile"}>Profile</NavLink>
            ) : (
              <NavLink to={"/register"}>Register</NavLink>
            )}
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarComponent;
