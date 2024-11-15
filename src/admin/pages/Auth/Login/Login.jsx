import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import handleToken from "../../../../services/HandleToken";
import { AdminService } from "../../../../services/apis/AdminService";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";

const providers = [{ id: "credentials", name: "Người dùng và Mật khẩu" }];

export default function LoginAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, logout } = useAuth();
  const signIn = async () => {
    const promise = new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const response = await AdminService.login(username, password);
          login(
            response.data.token,
            response.data.userName,
            response.data.role
          );
          enqueueSnackbar(response.message, {
            variant: "success",
            autoHideDuration: 1000,
            onExit: () => {
              navigate("/admin");
            },
          });
        } catch (error) {
          console.log(error);
          enqueueSnackbar(
            error.response?.data?.message || "Đăng nhập thất bại",
            {
              variant: "error",
              autoHideDuration: 1000,
            }
          );
        }
      }, 300);
    });
    return promise;
  };

  const BRANDING = {
    logo: (
      <img
        src="https://mui.com/static/logo.svg"
        alt="MUI logo"
        style={{ height: 24 }}
      />
    ),
    title: "MUI",
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
          submitButton: { children: "Đăng nhập" },
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
