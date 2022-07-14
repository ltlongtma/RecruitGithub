import className from "classnames/bind";
import styles from "./reset.module.scss";
import logo from "../../assets/logo-tma.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const cx = className.bind(styles);

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmitForm = (e) => {
    // e.preventDefault();
    alert("Your password has been reset successfully.");
    navigate("/login");
  };

  //Validate Form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      codeNumber: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const codeNumber = useRef();
  codeNumber.current = watch("codeNumber");
  const password = useRef({});
  password.current = watch("password");
  const passwordConfirm = useRef({});
  passwordConfirm.current = watch("passwordConfirm");

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
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="codeNumber">
                  Reset Code Number
                </label>
                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="Input your reset code number"
                  {...register("codeNumber", {
                    required: "Your reset code number must not be blank",
                  })}
                ></input>
                <ErrorMessage
                  errors={errors}
                  name="codeNumber"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="emailPassword">
                  New Password
                </label>
                <div className={cx("form-password")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Input your new password"
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
              <div className="mb-3">
                <label className="form-label" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <div className={cx("form-password")}>
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
                className={cx("btn", "btn login btn-success mt-3 col-12 mx-auto")}
              >
                Reset Password
              </button>

              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
