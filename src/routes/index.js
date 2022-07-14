import {
  Home,
  Register,
  Login,
  User,
  ResetPassword,
  ChangePassword,
  ViewDetailQuestion,
  CreateQuestion,
} from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];

export const adminRoute = [
  { path: "/", component: Home },

  { path: "/question", component: Home },
  { path: "/question/:questionId", component: ViewDetailQuestion },
  { path: "/user", component: User },
  { path: "/question/create", component: CreateQuestion },
];

export const userRoute = [
  { path: "/question", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];

export const guestRoute = [
  { path: "/question", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];
