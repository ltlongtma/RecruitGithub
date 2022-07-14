import {
  Home,
  Register,
  Login,
  User,
  ResetPassword,
  ChangePassword,
  ViewDetailQuestion,
} from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";
import { CreateQuestion } from "../pages/create-question";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
  { path: "/question/create", component: CreateQuestion, layout: LoginLayout },
];

export const adminRoute = [
  { path: "/question", component: Home },
  { path: "/question/:questionId", component: ViewDetailQuestion },

  { path: "/user", component: User },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];
export const userRoute = [
  { path: "/question", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];

export const guestRoute = [
  { path: "/question", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];
