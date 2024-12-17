import * as React from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ToastContainer } from "react-toastify";
import { PageContainer } from "@toolpad/core";

export default function LayoutAdmin() {
  return (
    <DashboardLayout>
        <Outlet />
        <ToastContainer />
    </DashboardLayout>
  );
}
