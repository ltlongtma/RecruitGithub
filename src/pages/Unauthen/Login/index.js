import className from "classnames/bind";
import styles from "./Login.module.scss";
import logo from "../../../assets/logoTma.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { ModalForgotPassword } from "../ForgotPassword/ModalForgotPassword";
import { Spinner } from "react-bootstrap";
import { Button, Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../../features/getUser/Slice";

const cx = className.bind(styles);

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleOnSubmit = async () => {
    setCheckWaiting(true);
    const dataInputLogin = {
      username: username.current,
      password: password.current,
    };
    await dispatch(login(dataInputLogin));
    const isToken = sessionStorage.getItem("isToken");

    if (isToken) {
      navigate("/question");
    } else setCheckWaiting(false);
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
              <div className={cx(" mt-5")}>
                <h6 className={cx(" ml-2")} htmlFor="username">
                  User Name
                </h6>
                <div>
                  <Input
                    type="text"
                    sx={{ width: "80%" }}
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
              <div className={cx("form-password")}>
                <h6 className={cx("col-md-3")} htmlFor="emailPassword">
                  Password
                </h6>
                <div>
                  <Input
                    sx={{ width: "80%" }}
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
