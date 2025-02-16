import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfilePage() {
  const { user } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUserAction());
    toast.success("You've logged out");
    navigate("/");
  }
  return (
    <div className="container mx-auto py-[50px] gap-[20px] flex flex-col items-center md:items-start md:flex-row">
      <img
        src={user.image}
        alt="avatar"
        className="w-[300px] h-[300px] rounded-full"
      />
      <div className="flex flex-col items-center md:items-start gap-[20px] p-[20px] bg-slate-400 rounded-lg">
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Date of Birth: {user.birthDate}</p>
        <p>Gender: {user.gender}</p>
        <button
          className="px-[24px] py-[12px] bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
