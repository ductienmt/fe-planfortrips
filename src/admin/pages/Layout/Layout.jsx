import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ToastContainer } from 'react-toastify';

export default function LayoutAdmin() {
  return (
    <DashboardLayout>
      <Outlet />
      <ToastContainer/>
    </DashboardLayout>
  );
}