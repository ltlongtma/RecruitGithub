import className from "classnames/bind";
import styles from "./Login.module.scss";
import logo from "../../assets/logo-tma.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/AxiosClient";
import { ModalForgotPassword } from "../ForgotPassword/ModalForgotPassword";
import userApi from "../../services/ManageUserApi";

const cx = className.bind(styles);

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleCreateNewAccount = () => {
    navigate("/register");
  };
  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setModalShow(true);
  };

  //Validate Form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const username = useRef({});
  username.current = watch("username");
  const password = useRef({});
  password.current = watch("password");

  const handleOnSubmit = () => {
    const dataInputLogin = {
      username: username.current,
      password: password.current,
    };

    userApi
      .login(dataInputLogin)
      .then((res) => {
        // console.log("RES ", res);
        sessionStorage.setItem("isRole", res.role[0]);
        sessionStorage.setItem("isToken", res.token);

        const isToken = sessionStorage.getItem("isToken");

        if (isToken) {
          navigate("/question");
        }
      })
      .catch((errors) => {
        console.log("ERROR LOGIN " + errors);
        alert("Your account is not authorized to login. Please create a new account and try again");
        // navigate("/register");
      });
  };

  return (
    <div className={cx("container-fluid", "login-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("row")}>
          <div className={cx("content-left col-md-7")}>
            <div className={cx("brand")}>
              <img src={logo} alt="TMA-s Logo" />
              <div className={cx("title")}>DC22's RECRUITMENT TOOL V1.0</div>
            </div>
          </div>
          <div className={cx("content-right", "col-md-5")}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  autoFocus
                  id="username"
                  placeholder="Your username"
                  {...register("username", {
                    required: "You have to input your user name",
                    minLength: { value: 3, message: "User name must be at least 3 characters" },
                  })}
                ></input>
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="emailPassword">
                  Password
                </label>
                <div className={cx("form-password")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    // name="password"
                    placeholder="Your password"
                    id="emailPassword"
                    {...register("password", {
                      required: "You have to input your password",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                  ></input>
                  <span onClick={handleShowHidePassword}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className={cx("icon-eye")}
                    ></FontAwesomeIcon>
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <button
                type="submit"
                className={cx("btn", "btn login btn-success mt-3 col-12 mx-auto")}
              >
                Login
              </button>
              <span
                className={cx("forgot-password", "text-center d-block mt-3 mb-3 ")}
                onClick={handleForgotPassword}
              >
                Forgot password?
              </span>
              <ModalForgotPassword show={modalShow} onHide={() => setModalShow(false)} />
              <hr />
              <button
                type="button"
                className={cx("btn", "btn login btn-success mt-3 col-12 mx-auto")}
                onClick={handleCreateNewAccount}
              >
                Create a new account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
