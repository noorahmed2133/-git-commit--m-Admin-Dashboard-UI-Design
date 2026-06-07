import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { PatientsPage } from "./pages/PatientsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "doctors", element: <DoctorsPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "emergency", element: <EmergencyPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);