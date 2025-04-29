import React from "react";
import { Form, Button } from "antd";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import IconInput from "../common/IconInput";
import { loginSchema } from "../../utils/validationSchemas";

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Comment out API call and directly navigate to dashboard
      // dispatch(login(values));
      navigate("/dashboard");
    },
  });

  return (
    <div className="auth-form">
      <Form onFinish={formik.handleSubmit} layout="vertical">
        <Form.Item
          label="EMAIL ADDRESS"
          validateStatus={
            formik.touched.email && formik.errors.email ? "error" : ""
          }
          help={formik.touched.email && formik.errors.email}
        >
          <IconInput
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefixIconName="fluent:mail-20-regular"
            showCircle={true}
          />
        </Form.Item>

        <Form.Item
          label="PASSWORD"
          validateStatus={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
          help={<div>{formik.touched.password && formik.errors.password}</div>}
        >
          <IconInput
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefixIconName="basil:lock-outline"
            suffixIconName="lets-icons:eye-light"
            showCircle={true}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="btn-color" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
