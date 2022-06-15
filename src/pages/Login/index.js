import className from "classnames/bind";
import styles from "./Login.module.scss";
import logo from "../../assets/logo-tma.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRef } from "react";

const cx = className.bind(styles);

export const Login = () => {
  const navigate = useNavigate();
  const handleCreateNewAccount = () => {
    navigate("/register");
  };
  //Validate Form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
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

  // console.log("EMAIL " + JSON.stringify(email));
  // console.log("PASSWORD " + JSON.stringify(password));

  const onSubmit = (e) => {
    // e.preventDefault();
    alert(`${JSON.stringify(e)}`);
    reset({
      ...getValues,
      email: "",
      password: "",
    });
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
          <div className={cx("content-right", "col-md-5")}>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <input
                  type="password"
                  className="form-control"
                  // name="password"
                  placeholder="Your password"
                  id="emailPassword"
                  {...register("password", {
                    required: "You have to input your password",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                ></input>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <p className={cx("text-error")}>{message}</p>}
                />
              </div>
              <button
                type="submit"
                className="btn login btn-success mt-3 col-12 mx-auto"
                onClick={handleSubmit(onSubmit)}
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
