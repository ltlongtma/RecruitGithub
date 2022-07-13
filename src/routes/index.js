import { Home, Register, Login, User, ResetPassword, ChangePassword } from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";
import { CreateQuestion } from "../pages/create-question";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
  { path: "/change-password", component: ChangePassword, layout:LoginLayout},
  { path: "/question/create", component: CreateQuestion, layout:LoginLayout},
];

export const adminRoute = [
  { path: "/",component: CreateQuestion, layout:LoginLayout },
  { path: "/user", component: User },
];
export const guestRoute = [{ path: "/", component: Home }];
