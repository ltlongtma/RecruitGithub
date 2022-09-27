import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { createNewUser, getUsersByAdmin } from "../Slice";
import styles from "../Modal/Modal.module.scss";
import userApi from "../../../services/ManageUserApi";
import AlertSuccess from "../../../components/Alert";
const cx = className.bind(styles);

export const ModalAddNewUser = ({ closeModal, ...props }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState(1);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleShowHidePassword = (e) => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      badgeId: "",
      username: "",
      name: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const email = useRef({});
  email.current = watch("email");
  const badgeId = useRef({});
  badgeId.current = watch("badgeId");
  const username = useRef({});
  username.current = watch("username");
  const name = useRef({});
  name.current = watch("name");
  const password = useRef({});
  password.current = watch("password");
  const newUser = {
    email: email.current,
    badgeId: badgeId.current,
    username: username.current,
    name: name.current,
    password: password.current,
    roles: [{ id: userRole }],
  };
  const handleChangeRole = (role) => {
    setUserRole(role);
  };

  const handleCreateNewUser = async (e) => {
    await dispatch(createNewUser(newUser));
    await dispatch(getUsersByAdmin());
    closeModal();

    setOpenAlert(true);
  };

  return (
    <div>
      <Modal {...props} className={cx("modal")}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>Add New User</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body >
            <div className="mb-3 ml-1 ">
              <label className="form-label" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                type="email"
                autoFocus
                className="form-control"
                id="emailAddress"
                placeholder="Email Address"
                {...register("email", {
                  required: "You have to input email",
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
              <label className="form-label" htmlFor="badgeId">
                Id Badge
              </label>
              <input
                type="number"
                className="form-control"
                name="badgeId"
                id="badgeId"
                placeholder="Input ID Badge"
                {...register("badgeId", {
                  required: "You have to input ID Badge",
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="badgeId"
                render={({ message }) => <p className={cx("text-error")}>{message}</p>}
              />
              <div className="pt-3">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <Form.Select
                  aria-label="role"
                  id="role"
                  onChange={(e) => {
                    handleChangeRole(e.target.value);
                  }}
                >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Guest</option>
                </Form.Select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="userName">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                name="userName"
                id="userName"
                placeholder="User Name"
                {...register("username", {
                  required: "You have to input username",
                  minLength: {
                    value: 3,
                    message: "User Name must be at least 3 characters",
                  },
                  pattern: {
                    value: /^\w[a-zA-Z@#0-9.]*$/,

                    message: " Your user name should not contain space",
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
                  required: "You have to input fullname",
                  minLength: {
                    value: 3,
                    message: " Full name must be at least 3 characters",
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
                  className={cx("form-control", "form-password")}
                  name="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "You have to input password",
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit(handleCreateNewUser)}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <AlertSuccess
        title="A new account was created successfully"
        openAlert={openAlert}
        closeAlert={handleCloseAlert}
      />
    </div>
  );
};
