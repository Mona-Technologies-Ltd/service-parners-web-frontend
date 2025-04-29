import React from "react";
import AuthLayout from "../../components/common/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in your Mona Protect business account to continue"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
