import className from "classnames/bind";
import styles from "./Login.module.scss";
import logo from "../../assets/logoTma.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { ModalForgotPassword } from "../ForgotPassword/ModalForgotPassword";
import userApi from "../../services/ManageUserApi";
import { Spinner } from "react-bootstrap";
import { Button, Input, TextField } from "@mui/material";

const cx = className.bind(styles);

export const Login = () => {
  const navigate = useNavigate();
  const [checkWaiting, setCheckWaiting] = useState(false);
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
    setCheckWaiting(true);
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
        setCheckWaiting(false);
        // navigate("/register");
      });
  };

  return (
    <div className={cx("container-fluid", "login-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("brand")}>
          <img src={logo} alt="TMA-s Logo" />
          <div className={cx("title")}>DC22's RECRUITMENT TOOL V1.0</div>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className={cx("body")}>
              <div className={cx("row mt-5")}>
                <h6 className={cx("col-md-3 ml-2")} htmlFor="username">
                  User Name
                </h6>
                <div className={cx("col-md-8 mb-5")}>
                  <Input
                    type="text"
                    fullWidth
                    autoFocus
                    id="username"
                    placeholder="Your username"
                    {...register("username", {
                      required: "You have to input your user name",
                      minLength: {
                        value: 3,
                        message: "User name must be at least 3 characters",
                      },
                    })}
                  ></Input>
                  <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                  />
                </div>
              </div>
              <div className={cx("row")}>
                <h6 className={cx("col-md-3")} htmlFor="emailPassword">
                  Password
                </h6>
                <div className={cx("col-md-8 mb-3", "form-password")}>
                  <Input
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    id="emailPassword"
                    {...register("password", {
                      required: "You have to input your password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  ></Input>
                  <span onClick={handleShowHidePassword} className={cx("icon-eye")}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                  </span>
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                  />
                </div>
              </div>
            </div>

            <div className={cx("footer")}>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  className={cx("btn text-center d-block login btn-primary mt-3 col-8 mx-auto")}
                  disabled={checkWaiting ? true : false}
                  size="medium"
                  color="warning"
                >
                  {checkWaiting ? (
                    <Spinner
                      className={cx("spinner")}
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      animation="border"
                    />
                  ) : null}
                  Login
                </Button>
              </div>
              <span
                className={cx("forgot-password", "text-center d-block mt-3 mb-3 ")}
                onClick={handleForgotPassword}
              >
                Forgot password?
              </span>

              <hr />
              <div>
                <Button
                  color="warning"
                  variant="contained"
                  size="medium"
                  type="button"
                  className={cx("btn login text-center d-block btn-primary mt-3 col-8 m-auto")}
                  onClick={handleCreateNewAccount}
                >
                  Create a new account
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ModalForgotPassword show={modalShow} onHide={() => setModalShow(false)} />
    </div>
    // </div>
  );
};
