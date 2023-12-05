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
    errorElement: <div>Un erreur est survenue</div>,
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
        path: "/",
        element: <AuthRoot />,
        children: [
          {
            path: "connexion",
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
