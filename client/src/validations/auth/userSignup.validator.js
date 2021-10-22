import * as yup from "yup";

const userSignupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label("First Name")
    .required()
    .min(3, "First name must have at least 3 characters")
    .max(20, "First name can have maximum 20 characters"),

  lastName: yup
    .string()
    .label("Last Name")
    .required()
    .min(3, "Last name must have at least 3 characters")
    .max(20, "Last name can have maximum 20 characters"),

  username: yup
    .string()
    .required()
    .label("Username")
    .min(3, "username must be at least 3 characters")
    .max(20, "username can have maximum 20 characters"),

  email: yup.string().required().label("Email").email("Please provide a valid email"),

  address: yup.string().label("Address").required(),

  password: yup.string().required().label("Password").min(6, "Password must have at least 6 characters"),

  confirmPassword: yup
    .string()
    .label("Confirm Password")
    .required()
    .min(6, "confirm password must have at least 6 characters")
    .oneOf([yup.ref("password"), null], "Confirm password doesn't match with password"),

  gender: yup.string().label("gender").required().oneOf(["male", "female", "other"]),
});

export default userSignupValidationSchema;
