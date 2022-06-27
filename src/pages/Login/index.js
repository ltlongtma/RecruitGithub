import className from "classnames/bind";
import styles from "./Login.module.scss";
import logo from "../../assets/logo-tma.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";

const cx = className.bind(styles);

const ModalForgotPassword = (props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const email = useRef({});
  email.current = watch("email");
  const handleSubmitEmail = () => {
    alert(
      `Your email: ${email.current} has been submitted. Check your email for further instructions`
    );

    navigate("/resetpassword");
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className={cx("modal-body")}>
        <Form>
          <Form.Group className="mb-3" controlId="reset-password">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Input your email address to recieve reset code"
              autoFocus
              {...register("email", {
                required: "You have to input your email ",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: " You entered wrong syntax EmailAdress",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p className={cx("text-error")}>{message}</p>}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit(handleSubmitEmail)}>
          Submit
        </Button>
        <Button variant="success" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const handleCreateNewAccount = () => {
    navigate("/register");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  //Validate Form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const email = useRef({});
  email.current = watch("email");
  const password = useRef({});
  password.current = watch("password");

  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };
  const Submit = () => {
    // e.preventDefault();
    const dataInputLogin = {
      email: email.current,
      password: password.current,
    };
    axios
      .post(`http://localhost:8080/api/user/login`, { ...dataInputLogin })
      .then((res) => {
        sessionStorage.setItem("isRole", JSON.stringify(res.data.role[0]));
        sessionStorage.setItem("isToken", JSON.stringify(res.data.token));

        const isToken = sessionStorage.getItem("isToken");

        if (isToken) {
          navigate("/");
        }
      })
      .catch((errors) => {
        console.log("ERROR " + errors);
        alert("Your account is not authorized to login. Please create a new account.");
        navigate("/register");
      });
  };

  const handleForgotPassword = () => {
    setModalShow(true);
  };

  return (
    <div className={cx("container-fluid", "login-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("row")}>
          <div className={cx("content-left col-md-7")}>
            <div className={cx("brand")}>
              <img src={logo} alt="TMA-s Logo" />
              <div className={cx("title")}>TMA's RECRUITMENT TOOL V1.0</div>
            </div>
          </div>
          <div className={cx("content-right", "col-md-5")}>
            <form onSubmit={handleSubmit(Submit)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="emailAdress">
                  Email Adress
                </label>
                <input
                  type="email"
                  className="form-control"
                  // name="email"
                  id="emailAdress"
                  placeholder="Your email address"
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
              <ModalForgotPassword
                show={modalShow}
                onHide={() => setModalShow(false)}
                // setModalShow={() => setModalShow(false)}
              />
              <hr />
              <button
                type="button"
                className={cx("btn", "btn login btn-success mt-3 col-12 mx-auto")}
                onClick={handleCreateNewAccount}
              >
                Create new account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
