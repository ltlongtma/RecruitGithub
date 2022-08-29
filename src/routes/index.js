import {
  Home,
  Register,
  Login,
  User,
  ResetPassword,
  ChangePassword,
  ViewDetailQuestion,
  CreateQuestion,
  ManageCategory,
  ManageTemplates,
  Interview,
} from "../pages";
import { LoginLayout } from "../components/Layout/LoginLayout";
import { ManageCriteria } from "../pages/ManageCriteria";
import TemplateDetail from "../features/getTemplates/ExploreTemplates/TemplateDetail";

export const publicRoute = [
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/register", component: Register, layout: LoginLayout },
  { path: "/resetpassword", component: ResetPassword, layout: LoginLayout },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];

export const adminRoute = [
  { path: "/", component: Home },
  { path: "/question", component: Home },
  { path: "/question-category", component: ManageCategory },
  { path: "/question-criteria", component: ManageCriteria },
  { path: "/question/:questionId", component: ViewDetailQuestion },
  { path: "/user", component: User },
  { path: "/question/create", component: CreateQuestion },
  { path: "/interview", component: Interview },

  { path: "/interview/templates", component: ManageTemplates },
  // { path: "/interview/templates/:templateId", component: TemplateDetail },
];

export const userRoute = [
  { path: "/question", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];

export const guestRoute = [
  { path: "/question", component: Home },
  { path: "/change-password", component: ChangePassword, layout: LoginLayout },
];
