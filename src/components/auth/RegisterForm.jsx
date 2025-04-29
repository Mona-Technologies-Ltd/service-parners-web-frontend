import React from "react";
import { Form, Button, Select } from "antd";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import IconInput from "../common/IconInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registrationSchema } from "../../utils/validationSchemas";

const { Option } = Select;

const RegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      role: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      // Handle registration - would normally call an API
      console.log(values);
      // Navigate to dashboard or verification page
      navigate("/dashboard");
    },
  });

  return (
    <div className="auth-form">
      <Form onFinish={formik.handleSubmit} layout="vertical">
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="FIRST NAME"
            validateStatus={
              formik.touched.firstName && formik.errors.firstName ? "error" : ""
            }
            help={formik.touched.firstName && formik.errors.firstName}
            style={{ flex: 1 }}
          >
            <IconInput
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              prefixIconName="clarity:user-line"
              showCircle={true}
            />
          </Form.Item>

          <Form.Item
            label="LAST NAME"
            validateStatus={
              formik.touched.lastName && formik.errors.lastName ? "error" : ""
            }
            help={formik.touched.lastName && formik.errors.lastName}
            style={{ flex: 1 }}
          >
            <IconInput
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              prefixIconName="clarity:user-line"
              showCircle={true}
            />
          </Form.Item>
        </div>

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
          label="NAME OF COMPANY"
          validateStatus={
            formik.touched.companyName && formik.errors.companyName
              ? "error"
              : ""
          }
          help={formik.touched.companyName && formik.errors.companyName}
        >
          <IconInput
            name="companyName"
            placeholder="Company Name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefixIconName="clarity:building-line"
            showCircle={true}
          />
        </Form.Item>

        <Form.Item
          label="ROLE"
          validateStatus={
            formik.touched.role && formik.errors.role ? "error" : ""
          }
          help={formik.touched.role && formik.errors.role}
        >
          <IconInput
            name="role"
            placeholder="Super Admin"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefixIconName="bi:person-badge"
            showCircle={true}
          />
        </Form.Item>

        <Form.Item
          label="PHONE NUMBER"
          validateStatus={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? "error"
              : ""
          }
          help={formik.touched.phoneNumber && formik.errors.phoneNumber}
        >
          <div className="phone-input-wrapper" style={{ position: "relative" }}>
            <PhoneInput
              country={"ng"}
              value={formik.values.phoneNumber}
              onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
              onBlur={formik.handleBlur}
              inputProps={{
                name: "phoneNumber",
                required: true,
                autoFocus: false,
              }}
              containerClass="phone-input-container"
              inputClass="phone-input-field"
              buttonClass="phone-dropdown-button"
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
                border: "1px solid #d9d9d9",
              }}
              buttonStyle={{
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
                border: "1px solid #d9d9d9",
                backgroundColor: "#f5f5f5",
              }}
              dropdownStyle={{ zIndex: 2000 }}
            />
          </div>
        </Form.Item>

        <Form.Item
          label="PASSWORD"
          validateStatus={
            formik.touched.password && formik.errors.password ? "error" : ""
          }
          help={formik.touched.password && formik.errors.password}
        >
          <IconInput
            name="password"
            type="password"
            placeholder="Create password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefixIconName="basil:lock-outline"
            suffixIconName="lets-icons:eye-light"
            showCircle={true}
          />
        </Form.Item>

        <Form.Item
          label="CONFIRM PASSWORD"
          validateStatus={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "error"
              : ""
          }
          help={formik.touched.confirmPassword && formik.errors.confirmPassword}
        >
          <IconInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefixIconName="basil:lock-outline"
            suffixIconName="lets-icons:eye-light"
            showCircle={true}
          />
        </Form.Item>

        <div className="terms-section" style={{ marginBottom: "20px" }}>
          <p>
            By clicking on Sign Up, I agree to Mona{" "}
            <Link to="/terms-of-service" className="auth-link">
              Terms of Services
            </Link>
            , and acknowledge the{" "}
            <Link to="/privacy-policy" className="auth-link">
              Privacy Policy
            </Link>
          </p>
        </div>

        <Form.Item>
          <Button
            type="primary"
            className="btn-color"
            htmlType="submit"
            block
            size="large"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
