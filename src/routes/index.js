import { Home, Register, Login, User, ResetPassword } from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
];

export const adminRoute = [
  { path: "/", component: Home },
  { path: "/user", component: User },
];
export const guestRoute = [{ path: "/", component: Home }];
