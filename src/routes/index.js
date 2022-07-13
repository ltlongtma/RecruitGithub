import { Home, Register, Login, User, ResetPassword, ChangePassword } from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";
import { CreateQuestion } from "../pages/create-question";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
<<<<<<< HEAD
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
=======
  { path: "/change-password", component: ChangePassword, layout:LoginLayout},
  { path: "/question/create", component: CreateQuestion, layout:LoginLayout},
>>>>>>> 33837d5c96660db1a71f72b3cc374660a75632a2
];

export const adminRoute = [
  { path: "/",component: Home },
  { path: "/user", component: User },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];
export const guestRoute = [
  { path: "/", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];
