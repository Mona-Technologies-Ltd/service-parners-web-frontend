import React from "react";
import AuthLayout from "../../components/common/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Welcome, let's create an account"
      subtitle="Create an account to keep track of your customers and view claims."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
