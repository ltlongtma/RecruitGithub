import React, { useRef, useState } from "react";
import className from "classnames/bind";
import styles from "./Register.module.scss";
import logo from "../../assets/logo-tma.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = className.bind(styles);

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleBackToLogin = () => {
    navigate("/login");
  };
  const handleCreateNewAccount = (e) => {
    const dataRegister = {
      username: username.current,
      email: email.current,
      password: password.current,
    };
    axios
      .post(`http://localhost:8080/api/user/sign-up`, { ...dataRegister })
      .then((res) => alert(`Your account has been created successfully`), navigate("/login"))

      .catch((err) => console.log("ERROR " + err));

    // reset({ ...getValues, email: "", username: "", password: "", passwordConfirm: "" });
  };
  const handleShowHidePassword = (e) => {
    setShowPassword(!showPassword);
  };
  //validate Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const email = useRef({});
  email.current = watch("email");
  const username = useRef({});
  username.current = watch("username");
  const name = useRef({});
  name.current = watch("name");
  const password = useRef({});
  password.current = watch("password");
  const passwordConfirm = useRef({});
  passwordConfirm.current = watch("passwordConfirm");

  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className={cx("container-fluid", "register-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("row")}>
          <div className={cx("content-left col-md-7")}>
            <div className={cx("brand")}>
              <img src={logo} alt="TMA-s Logo" />
              <div className={cx("title")}>DC22's RECRUITMENT TOOL V1.0</div>
            </div>
          </div>
          <div className={cx("content-right", "col-md-5")}>
            <form onSubmit={handleSubmit(handleCreateNewAccount)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="emailAddress">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  // name="email"
                  id="emailAddress"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "You have to input your email",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: " You entered wrong syntax EmailAdress",
                    },
                  })}
                ></input>
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="userName">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="userName"
                  placeholder="User Name"
                  {...register("username", {
                    required: "You have to input your username",
                    minLength: {
                      value: 3,
                      message: "User Name must be at least 3 characters",
                    },
                  })}
                ></input>
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "You have to input your fullname",
                    minLength: {
                      value: 3,
                      message: "Your full name must be at least 3 characters",
                    },
                  })}
                ></input>
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className={cx("input-password")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "You have to input your password",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                  ></input>
                  <span onClick={handleShowHidePassword}>
                    <FontAwesomeIcon
                      className={cx("icon-eye")}
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <div className={cx("input-password")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder="Confirm Password"
                    {...register("passwordConfirm", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password.current || "The passwords do not match",
                    })}
                  ></input>
                  <span onClick={handleShowHidePassword}>
                    <FontAwesomeIcon
                      className={cx("icon-eye")}
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="passwordConfirm"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <button
                type="submit"
                className={cx("btn", "btn btn-success mt-3 col-12 mx-auto")}
                // onClick={handleSubmit(handleCreateNewAccount)}
              >
                Create a new account
              </button>
              <button
                className={cx("btn", "btn btn-success mt-3 col-12 mx-auto")}
                onClick={handleBackToLogin}
              >
                Already have an account. Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
