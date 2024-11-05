import React, { useEffect } from "react";

const EnterpriseDashboard = () => {
  useEffect(() => {
    document.title = "Thống kê";
  }, []);
  return (
    <>
      <h1>Enterprise Dashboard</h1>
    </>
  );
};

export default EnterpriseDashboard;
