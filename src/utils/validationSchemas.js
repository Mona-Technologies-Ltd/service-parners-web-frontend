import * as Yup from "yup";

// Login form validation schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Registration form validation schema
export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  companyName: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  role: Yup.string().required("Role is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(6, "Phone number is too short"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

// Forgot password validation schema
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

// Reset password validation schema
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

// Business owner information validation schema
export const businessOwnerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
});

// Business information validation schema
export const businessInfoSchema = Yup.object().shape({
  businessName: Yup.string().required("Business name is required"),
  businessType: Yup.string().required("Business type is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  businessRegistrationNumber: Yup.string().required(
    "Business registration number is required"
  ),
  website: Yup.string().url("Invalid URL format").nullable(),
});

// Business registration validation schema
export const businessRegistrationSchema = Yup.object().shape({
  // Business Owner Info
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),

  // Business Info
  businessName: Yup.string()
    .required("Business name is required")
    .min(2, "Business name must be at least 2 characters"),
  businessType: Yup.string()
    .required("Business type is required")
    .min(2, "Business type must be at least 2 characters"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  businessEmail: Yup.string()
    .email("Invalid email address")
    .required("Business email is required"),
  businessPhoneNumber: Yup.string()
    .required("Business phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  businessRegistrationNumber: Yup.string()
    .required("Business registration number is required")
    .min(5, "Registration number must be at least 5 characters"),
  website: Yup.string().url("Invalid URL format").nullable(),
});

// Team member registration schema
export const teamMemberSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  businessAddress: Yup.string().required("Business address is required"),
  businessEmail: Yup.string()
    .email("Invalid email address")
    .required("Business email is required"),
  nin: Yup.string().required("NIN is required"),
  confirmNin: Yup.string()
    .oneOf([Yup.ref("nin"), null], "NIN numbers must match")
    .required("Confirm NIN is required"),
  role: Yup.string().required("Role is required"),
  businessPhoneNumber: Yup.string()
    .required("Business phone number is required")
    .matches(/^\+?\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Team member registration validation schema
export const teamMemberRegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  gender: Yup.string().required("Gender is required"),
  DOB: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  businessAddress: Yup.string()
    .required("Business address is required")
    .min(5, "Address must be at least 5 characters"),
  BusinessEmail: Yup.string()
    .email("Invalid email address")
    .required("Business email is required"),
  NIN: Yup.string()
    .required("NIN is required")
    .min(11, "NIN must be at least 11 characters"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["user", "business_owner", "admin", "team_member"], "Invalid role"),
  businessPhoneNumber: Yup.string()
    .required("Business phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});
