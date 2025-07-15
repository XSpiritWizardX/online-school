import Layout from "./Layout";
import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage/LandingPage";
import BlankPage from "../components/BlankPage/BlankPage";
import TermsOfService from "../components/TermsOfService/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import CookiesPolicy from "../components/CookiePolicy/CookiePolicy";

import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/cookies-policy",
        element: <CookiesPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/coming-soon",
        element: <BlankPage />,
      },
      {
        path: "*",
        element: <h2>Page Not Found</h2>,
      },
    ],
  },
]);
