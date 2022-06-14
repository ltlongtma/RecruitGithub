import className from "classnames/bind";
import styles from "./Login.module.scss";
import logo from "../../assets/logo-tma.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = className.bind(styles);

export const Login = () => {
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${JSON.stringify(formInput)}`);
    setFormInput({ email: "", password: "" });
  };
  const handleCreateNewAccount = () => {
    navigate("/register");
  };
  return (
    <div className={cx("container-fluid", "login-container")}>
      <div className={cx("container", "container-content")}>
        <div className={cx("row")}>
          <div className={cx("content-left col-md-7")}>
            <div className={cx("brand")}>
              <img src={logo} alt="TMA-s Logo" />
            </div>
            <div className={cx("detail")}>TMA's RECRUITMENT TOOL V1.0</div>
          </div>
          <div className={cx("content-right col-md-5")}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="emailAdress">
                  Email Adress
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="emailAdress"
                  placeholder="Your email address"
                  onChange={handleChange}
                  value={formInput.email}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="emailPassword">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Your password"
                  id="emailPassword"
                  onChange={handleChange}
                  value={formInput.password}
                ></input>
              </div>
              <button
                type="submit"
                className="btn login btn-success mt-3 col-12 mx-auto"
                onClick={handleSubmit}
              >
                Login
              </button>
              <span className="text-center d-block mt-3 mb-3 ">Forgot password?</span>
              <hr />
              <button
                type="button"
                className="btn btn-success register col-12 mx-auto"
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
