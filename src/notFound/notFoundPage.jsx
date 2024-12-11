import { Button } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", backgroundImage: "inherit" }}>
      <p style={{ fontSize: "100px", fontWeight: "bold", margin: "0", color: "#FF6F61" }}>
        404
      </p>
      <p style={{ fontSize: "24px", fontWeight: "500", color: "#333" }}>
        Không tìm thấy trang
      </p>
      <Button
        onClick={handleGoBack}
        variant="solid"
        size="lg"
        color="primary"
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "18px",
          textTransform: "none",
          borderRadius: "8px",
        }}
      >
        Quay lại trang trước
      </Button>
    </div>
  );
};

export default NotFoundPage;
