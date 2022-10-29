import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at lease 2 characters")
    .max(128, "Name can't be greater than 128 characters")
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Only alphabets are allowed"),
  email: Yup.string().trim().required("Email is required").email(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  address: Yup.string().required(),
});
