import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage/LandingPage";
import BlankPage from "../components/BlankPage/BlankPage";
import TermsOfService from "../components/Compliance/TermsOfService/TermsOfService";
import PrivacyPolicy from "../components//Compliance/PrivacyPolicy/PrivacyPolicy";
import CookiesPolicy from "../components//Compliance/CookiePolicy/CookiePolicy";
import TestIde from "../components/TestingPageForIDE/TestIde";
import TestCourseEditor from "../components/TestCourseEditor/TestCourseEditor";
import ChatBot from "../components/ChatBot/GeminiChat";
import Layout from "./Layout";
import CourseInterface from "../components/CourseInterface/CourseInterface";
import SettingsPage from "../components/SettingsPage/SettingsPage";
import ProfilePage from "../components/ProfilePage/ProfilePage";

import TestPage from "../components/TestPages/VideoTest/VideoTest";
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/test-ide",
        element: <TestIde />,
      },
      {
        path: "/course-editor",
        element: <TestCourseEditor />,
      },
      {
        path: "/chat",
        element: <ChatBot />,
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
        path: "/test-course",
        element: <CourseInterface />,
      },
      {
        path: "/settings/:userId",
        element: <SettingsPage />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/test-video",
        element: <TestPage />,
      },
      {
        path: "*",
        element: <h2>Page Not Found</h2>,
      },
    ],
  },
]);
