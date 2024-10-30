import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { TextField, Link, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Define the providers with Vietnamese names
const providers = [
  { id: "credentials", name: "Người dùng và Mật khẩu" },
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
];

export default function LoginAdmin() {
  const navigate = useNavigate();
  const theme = useTheme();

  const signIn = async (provider, formData) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        alert(
          `Đăng nhập với "${provider.name}" và thông tin: ${formData.get("email")}, ${formData.get("password")}`
        );
        resolve({
          type: "CredentialsSignin",
          error: "Thông tin không chính xác.",
        });
        navigate("/");
      }, 300);
    });
    return promise;
  };

  const CustomEmailField = (props) => (
    <TextField label="Địa chỉ Email" variant="outlined" {...props} className="w-100 mb-3"/>
  );

  const CustomPasswordField = (props) => (
    <TextField label="Mật khẩu" type="password" variant="outlined" {...props}  className="w-100 mb-3"/>
  );

  const CustomSubmitButton = (props) => (
    <LoadingButton variant="contained" {...props} className="w-100 mb-3">
      Đăng Nhập
    </LoadingButton>
  );

  const CustomForgotPasswordLink = (props) => (
    <Link href="/forgot-password" {...props}>
      Quên mật khẩu?
    </Link>
  );

  const CustomSignUpLink = (props) => (
    <Link href="/sign-up" {...props}>
      Chưa có tài khoản? Đăng ký ngay!
    </Link>
  );

  const slots = {
    emailField: CustomEmailField,
    passwordField: CustomPasswordField,
    submitButton: CustomSubmitButton,
    forgotPasswordLink: CustomForgotPasswordLink,
    signUpLink: CustomSignUpLink,
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slots={slots}
      />
    </AppProvider>
  );
}
