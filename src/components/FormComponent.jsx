import { useFormik } from "formik";
import { useEffect } from "react";
import { useRef } from "react";
import { FileParser } from "../utils/FileParser";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userLoggedAction } from "../store/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FormComponent() {
  const inputRef = useRef();
  const imageInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Image validation
  // size
  const KB = 1024;
  const MB = KB * 1024;
  // type
  const VALID_TYPE = ["image/png", "image/jpg", "image/jpeg"];

  const formik = useFormik({
    // 1. initialValues
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      image: "",
      birthDate: "",
    },

    // 2. validation YUP
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required!"),
      lastName: Yup.string().required("Last Name is required!"),
      email: Yup.string()
        .email("Email is not valid!")
        .required("Email is required!"),
      password: Yup.string().min(4).required("Password is required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required!"),
      gender: Yup.string().required("Gender is required!"),
      birthDate: Yup.string().required("Birth Date is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test(
          "fileSize",
          "Image size must be under 500KB",
          (value) => value.size < KB * 500
        )
        .test(
          "fileType",
          "Valid image extensios are jpg, jpeg and png",
          (value) => VALID_TYPE.includes(value.type)
        ),
    }),

    // 3. onSubmit
    onSubmit: (values) => {
      FileParser(values.image)
        .then((res) => {
          dispatch(userLoggedAction({ ...values, image: res }));
          toast.success("Successuful Registration");
          navigate("/profile");
        })
        .catch((err) => console.log(err));
      formik.resetForm();
      imageInputRef.current.value = "";
    },
  });

  const showErrors = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <form
      className="bg-slate-300 w-full md:w-[500px] flex flex-col gap-[5px] p-[15px] rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      {/* firstName */}
      <div className="flex flex-col">
        <label
          htmlFor="firstName"
          className={`text-xs  ${
            showErrors("firstName") ? "text-red-600" : ""
          }`}
        >
          {showErrors("firstName") ? showErrors("firstName") : "First Name"}
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          ref={inputRef}
        />
      </div>
      {/* lastName */}
      <div className="flex flex-col">
        <label
          htmlFor="lastName"
          className={`text-xs  ${showErrors("lastName") ? "text-red-600" : ""}`}
        >
          {showErrors("lastName") ? showErrors("lastName") : "Last Name"}
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </div>
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
      {/* confirmPassword */}
      <div className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className={`text-xs  ${
            showErrors("confirmPassword") ? "text-red-600" : ""
          }`}
        >
          {showErrors("confirmPassword")
            ? showErrors("confirmPassword")
            : "Conifirm Password"}
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
      </div>
      {/* gender */}
      <div className="flex flex-col">
        <label
          htmlFor="gender"
          className={`text-xs  ${showErrors("gender") ? "text-red-600" : ""}`}
        >
          {showErrors("gender") ? showErrors("gender") : "Gender"}
        </label>
        <select
          name="gender"
          id="gender"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option value="" defaultChecked>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      {/* image */}
      <div className="flex flex-col">
        <label
          htmlFor="image"
          className={`text-xs  ${showErrors("image") ? "text-red-600" : ""}`}
        >
          {showErrors("image") ? showErrors("image") : "Image"}
        </label>
        <input
          type="file"
          name="image"
          id="image"
          ref={imageInputRef}
          accept="image/jpg, image/jpeg, image/png"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          onChange={(e) => {
            formik.setFieldValue(e.target.name, e.target.files[0]);
          }}
        />
      </div>
      {/* birthDate */}
      <div className="flex flex-col">
        <label
          htmlFor="birthDate"
          className={`text-xs  ${
            showErrors("birthDate") ? "text-red-600" : ""
          }`}
        >
          {showErrors("birthDate") ? showErrors("birthDate") : "Birth Date"}
        </label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          placeholder="Birth Date"
          className="outline-none px-[16px] py-[4px] rounded-lg"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-[16px] py-[4px] rounded-lg hover:bg-blue-700 transition-all duration-300 mt-[10px]"
      >
        Register Me
      </button>
    </form>
  );
}

export default FormComponent;
