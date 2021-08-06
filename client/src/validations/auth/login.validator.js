import * as yup from "yup";

const adminLoginValidationSchema = yup.object().shape({
  username: yup.string().required().label("Username"),

  password: yup.string().required().label("Password").min(6, "Password must have at least 6 characters"),
});

export default adminLoginValidationSchema;
