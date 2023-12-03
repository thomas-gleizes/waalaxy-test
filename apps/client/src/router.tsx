import { createBrowserRouter, Navigate } from "react-router-dom"

import Root from "./pages/Root"
import AuthRoot from "./pages/auth/Root.tsx"
import AppRoot from "./pages/app/Root.tsx"
import HomePage from "./pages/app/Home.tsx"
import LoginPage from "./pages/auth/Login.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <AppRoot />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/connexion",
        element: <AuthRoot />,
        children: [
          {
            path: "/",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
])

export default router
