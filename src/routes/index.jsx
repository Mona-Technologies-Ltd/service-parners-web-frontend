import { createBrowserRouter, Navigate } from "react-router-dom";
import Claims from "../pages/Claims";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import AccountPage from "../pages/AccountPage";
import SupportPage from "../pages/SupportPage";
import DevicesPage from "../pages/DevicesPage";
import DeviceDetailPage from "../pages/DeviceDetailPage";
import PaymentPage from "../pages/PaymentPage";
import PremiumPage from "../pages/PremiumPage";
import ReportsPage from "../pages/ReportsPage";
import QueriedApplicationsPage from "../pages/QueriedApplicationsPage";
import ManageAdminsPage from "../pages/ManageAdminsPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: (
      // <ProtectedRoute>
        <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/claims",
        element: <Claims />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/support",
        element: <SupportPage />,
      },
      {
        path: "/devices",
        element: <DevicesPage />,
      },
      {
        path: "/devices/:id",
        element: <DeviceDetailPage />,
      },
      {
        path: "/payments",
        element: <PaymentPage />,
      },
      {
        path: "/premium",
        element: <PremiumPage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
      {
        path: "/queried-applications",
        element: <QueriedApplicationsPage />,
      },
      {
        path: "/manage-admins",
        element: <ManageAdminsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
