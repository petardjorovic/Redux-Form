import { useFormik } from "formik";
import { useEffect } from "react";
import { useRef } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userLoggedAction } from "../store/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginFormComponent() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    // 1. initialValues
    initialValues: {
      email: "",
      password: "",
    },

    // 2. validation YUP
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid!")
        .required("Email is required!"),
      password: Yup.string().min(4).required("Password is required!"),
    }),

    // 3. onSubmit
    onSubmit: (values) => {
      dispatch(userLoggedAction({ ...values }));
      toast.success("You are logged in");
      navigate("/profile");
      formik.resetForm();
    },
  });

  const showErrors = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <form
      className="bg-slate-300 w-full md:w-[500px] flex flex-col gap-[5px] p-[15px] rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      {/* email */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className={`text-xs  ${showErrors("email") ? "text-red-600" : ""}`}
        >
          {showErrors("email") ? showErrors("email") : "Email"}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.email}
          onChange={formik.handleChange}
          ref={inputRef}
        />
      </div>
      {/* password */}
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className={`text-xs  ${showErrors("password") ? "text-red-600" : ""}`}
        >
          {showErrors("password") ? showErrors("password") : "Password"}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-[16px] py-[4px] rounded-lg hover:bg-blue-700 transition-all duration-300 mt-[10px]"
      >
        Login
      </button>
    </form>
  );
}

export default LoginFormComponent;
