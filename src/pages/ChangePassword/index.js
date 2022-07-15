import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import className from "classnames/bind";
import logo from "../../assets/logo-tma.png";
import styles from "./ChangePassword.module.scss";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { faEye, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import userApi from "../../services/ManageUserApi";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const cx = className.bind(styles);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [checkWaiting, setCheckWaiting] = useState(false);
  const [checkNewPassword, setCheckNewPassword] = useState(true);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);
  const [checkValidationError, setCheckValidationError] = useState(true);
  const newPasswordErrorText = "Password must have: at least 8 characters";

  const [confirmPasswordErrorText, setConfirmPasswordErrorText] =
    useState(newPasswordErrorText);

  const handleShowHideOldPassword = (e) => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowHideNewPassword = (e) => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowHideConfirmPassword = (e) => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCheckValidationError(true);
      setCheckWaiting(true);
      const dataInput = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      userApi
        .changePassword(dataInput)
        .then((res) => {
          sessionStorage.setItem("isRole", res.data.role[0]);
          sessionStorage.setItem("isToken", res.data.token);

          const isToken = sessionStorage.getItem("isToken");

          alert("Change password success");

          if (isToken) {
            navigate("/");
          }
        })
        .catch((errors) => {
          console.log("ERROR " + errors);
          const checkConfirmPasswordContainer = document.getElementById(
            "check-old-password-container"
          );
          checkConfirmPasswordContainer.style.visibility = "visible";
        })
        .finally((e) => {
          setCheckWaiting(false);
        });
    } else {
      setCheckValidationError(false);
    }
  };

  const cancel = () => {
    navigate("/");
  };

  const checkMatchPassword = (newPassword, confirmPassword) =>
    newPassword === confirmPassword;

  const validateForm = () => {
    return (
      oldPassword?.length >= 8 &&
      newPassword?.length >= 8 &&
      confirmPassword?.length >= 8 &&
      checkMatchPassword(newPassword, confirmPassword)
    );
  };

  return (
    <div className={cx("container-fluid", "change-password-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("row")}>
          <div className={cx("content-left", "content-left col-md-7")}>
            <div className={cx("brand")}>
              <img src={logo} alt="TMA-s Logo" />
              <div className={cx("title")}>DC22's RECRUITMENT TOOL V1.0</div>
            </div>
          </div>
          <div className={cx("content-right", "col-md-5")}>
            <h1 className={cx("change-password-heading", "text-center")}>
              Change Password
            </h1>
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="password">
                  Old Password
                </label>
                <div className={cx("input-password")}>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="form-control"
                    id="oldPassword"
                    placeholder="Old password"
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  ></input>
                  <span onClick={handleShowHideOldPassword}>
                    <FontAwesomeIcon
                      className={cx("icon-eye")}
                      icon={showOldPassword ? faEyeSlash : faEye}
                    />
                  </span>
                  <div
                    id="check-old-password-container"
                    style={{ visibility: "hidden" }}
                  >
                    <FontAwesomeIcon
                      className={cx("icon-xmark")}
                      icon={faXmark}
                    />
                    <span className={cx("error-text")}>Wrong password</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="password">
                  New Password
                </label>
                <div className={cx("input-password")}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="form-control"
                    id="newPassword"
                    placeholder="New password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      const checkNewPasswordContainer = document.getElementById(
                        "check-new-password-container"
                      );
                      if (e.target.value.length > 0) {
                        checkNewPasswordContainer.style.visibility = "visible";
                        if (e.target.value.length < 8) {
                          setCheckNewPassword(false);
                        } else {
                          setCheckNewPassword(true);
                        }
                      } else {
                        checkNewPasswordContainer.style.visibility = "hidden";
                      }
                    }}
                  ></input>
                  <span onClick={handleShowHideNewPassword}>
                    <FontAwesomeIcon
                      className={cx("icon-eye")}
                      icon={showNewPassword ? faEyeSlash : faEye}
                    />
                  </span>
                  <div
                    id="check-new-password-container"
                    style={{ visibility: "hidden" }}
                  >
                    <FontAwesomeIcon
                      className={
                        checkNewPassword ? cx("icon-check") : cx("icon-xmark")
                      }
                      icon={checkNewPassword ? faCheck : faXmark}
                    />
                    <span
                      className={cx("error-text")}
                      hidden={checkNewPassword ? "hiden" : ""}
                    >
                      {newPasswordErrorText}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="password">
                  Confirm Password
                </label>
                <div className={cx("input-password")}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      const checkConfirmPasswordContainer =
                        document.getElementById(
                          "check-confirm-password-container"
                        );
                      if (e.target.value.length > 0) {
                        checkConfirmPasswordContainer.style.visibility =
                          "visible";
                        if (e.target.value.length < 8) {
                          setCheckConfirmPassword(false);
                          setConfirmPasswordErrorText(newPasswordErrorText);
                        } else {
                          setCheckConfirmPassword(true);
                          if (
                            !checkMatchPassword(newPassword, e.target.value)
                          ) {
                            setCheckConfirmPassword(false);
                            setConfirmPasswordErrorText(
                              "Confirm password does not match password"
                            );
                          }
                        }
                      } else {
                        checkConfirmPasswordContainer.style.visibility =
                          "hidden";
                      }
                    }}
                  ></input>
                  <span onClick={handleShowHideConfirmPassword}>
                    <FontAwesomeIcon
                      className={cx("icon-eye")}
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </span>
                  <div
                    id="check-confirm-password-container"
                    style={{ visibility: "hidden" }}
                  >
                    <FontAwesomeIcon
                      className={
                        checkConfirmPassword
                          ? cx("icon-check")
                          : cx("icon-xmark")
                      }
                      icon={checkConfirmPassword ? faCheck : faXmark}
                    />
                    <span
                      className={cx("error-text")}
                      hidden={checkConfirmPassword ? "hiden" : ""}
                    >
                      {confirmPasswordErrorText}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={cx("btn", "btn btn-success mt-3 col-12 mx-auto")}
                disabled={checkWaiting ? true : false}
                // onClick={handleSubmit(handleCreateNewAccount)}
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
                Change password
              </button>
              <button
                className={cx("btn", "btn btn-secondary mt-3 col-12 mx-auto")}
                onClick={cancel}
              >
                Cancel
              </button>
              <span
                className={cx("error-text")}
                style={{
                  visibility: checkValidationError ? "hidden" : "visible",
                }}
              >
                Please fill in all fields
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
