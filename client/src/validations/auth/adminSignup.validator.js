import * as yup from "yup";

const adminSignupValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .label("Username")
    .min(3, "username must be at least 3 characters")
    .max(20, "username can have maximum 20 characters"),

  email: yup.string().required().label("Email").email("Please provide a valide email"),

  password: yup.string().required().label("Password").min(6, "Password must have at least 6 characters"),

  confirmPassword: yup
    .string()
    .label("Confirm Password")
    .required()
    .min(6, "confirm password must have at least 6 characters")
    .oneOf([yup.ref("password"), null], "Confirm password doesn't match with password"),

  secretCode: yup.string().required("admin secret is required").label("secretCode"),
});

export default adminSignupValidationSchema;
