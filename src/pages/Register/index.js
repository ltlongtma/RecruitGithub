import className from "classnames/bind";
import styles from "./Register.module.scss";
import logo from "../../assets/logo-tma.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cx = className.bind(styles);

export const Register = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/login");
  };
  const [formInput, setFormInput] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCreateNewAccount = (e) => {
    e.preventDefault();
    alert(`${JSON.stringify(formInput)}`);
    setFormInput({
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    });
  };
  return (
    <div className={cx("container-fluid", "register-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("row")}>
          <div className={cx("content-left col-md-7")}>
            <div className={cx("brand")}>
              <img src={logo} alt="TMA-s Logo" />
            </div>
            <div className={cx("detail")}>TMA's RECRUITMENT TOOL V1.0</div>
          </div>
          <div className={cx("content-right col-md-5")}>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="emailAddress">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="emailAddress"
                  placeholder="Email Address"
                  value={formInput.email}
                  onChange={handleChange}
                ></input>
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
                  value={formInput.username}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formInput.password}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  value={formInput.passwordConfirm}
                  onChange={handleChange}
                ></input>
              </div>
              <button
                type="submit"
                className="btn login btn-success mt-3 col-12 mx-auto"
                onClick={handleCreateNewAccount}
              >
                Create new account
              </button>
              <button className="btn btn-success mt-3 col-12 mx-auto" onClick={handleBackToLogin}>
                Already have an account. Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
