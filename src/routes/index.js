import {
  Home,
  Register,
  Login,
  User,
  ResetPassword,
  ChangePassword,
  CreateQuestion,
} from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
  { path: "/question/create", component: CreateQuestion, layout:LoginLayout},
]
export const adminRoute = [
  { path: "/", component: Home },
  { path: "/user", component: User },
  { path: "/question/create", component: CreateQuestion },
];
export const guestRoute = [
  { path: "/", component: Home },
  { path: "/question/create", component: CreateQuestion },
];

  
