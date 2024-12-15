import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../../services/apis/AdminService";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";

const providers = [{ id: "credentials", name: "Người dùng và Mật khẩu" }];

export default function LoginAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { login, logout } = useAuth();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await AdminService.login(username, password);
      login(response.data.token, response.data.role, response.data.userName);
      enqueueSnackbar(response.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          navigate("/admin");
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response?.data?.message || "Đăng nhập thất bại", {
        variant: "error",
        autoHideDuration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    document.title = "Đăng nhập Admin";
  }, []);

  const BRANDING = {
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-50 h-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
    title: "Plan for trips",
  };

  return (
    <AppProvider theme={theme} branding={BRANDING}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: {
            label: "Tên người dùng",
            name: "userName",
            required: true,
            type: "text",
            onChange: (e) => setUsername(e.target.value),
          },
          passwordField: {
            label: "Mật khẩu",
            name: "password",
            required: true,
            type: "password",
            onChange: (e) => setPassword(e.target.value),
          },
          submitButton: {
            children: loading ? "Đang đăng nhập..." : "Đăng nhập",
            disabled: loading,
          },
          forgotPasswordLink: {
            children: "Quên mật khẩu?",
            href: "/forgot-password",
          },
          signUpLink: { children: "Đăng ký", href: "/sign-up" },
        }}
      />
    </AppProvider>
  );
}
