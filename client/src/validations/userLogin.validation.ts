import * as Yup from "yup";

export const userLoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters")
    .required("Password is required"),
});
