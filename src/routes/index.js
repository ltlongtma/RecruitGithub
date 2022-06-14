import { Home, Register, Login, User } from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";

export const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/user", component: User },
];
