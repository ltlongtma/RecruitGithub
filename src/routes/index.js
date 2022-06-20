import { Home, Register, Login, User } from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
];

export const privateRoute = [
  { path: "/", component: Home },
  { path: "/user", component: User },
];
