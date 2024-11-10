import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { TextField, Link, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import handleToken from "../../../../services/HandleToken";
import { AuthService } from "../../../../services/apis/AuthService";

const providers = [{ id: "credentials", name: "Người dùng và Mật khẩu" }];

export default function LoginAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signIn = async () => {
    const promise = new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const data = {
            userName: username,
            password: password,
            role: "ROLE_ADMIN",
          };
          const response = await AuthService.login(data);
          handleToken.save(
            response.data.data.token,
            response.data.data.userName,
            response.data.data.role
          );
          handleToken.setTimeout(86400 * 10000);
          enqueueSnackbar(response.data.message, {
            variant: "success",
            autoHideDuration: 1000,
            onExit: () => {
              navigate("/admin");
            },
          });
        } catch (error) {
          enqueueSnackbar(
            error.response?.data?.message || "Đăng nhập thất bại",
            {
              variant: "error",
              autoHideDuration: 1000,
            }
          );
        }
        resolve({
          type: "CredentialsSignin",
          error: "Thông tin không chính xác.",
        });
        navigate("/admin");
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
