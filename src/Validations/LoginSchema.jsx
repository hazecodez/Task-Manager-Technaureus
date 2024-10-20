import * as Yup from "yup";

const UsernamePasswordSchema = {
  username: Yup.string().required("The username field is required"),
  password: Yup.string()
    .required("The password field is required")
    .min(8, "Password must be at least 8 characters long"),
};

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("The first name field is required"),
  last_name: Yup.string().required("The last name field is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("The email field is required"),
  ...UsernamePasswordSchema,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("The confirm password field is required"),
});

const LoginSchema = Yup.object().shape({
  ...UsernamePasswordSchema,
});

export { SignupSchema, LoginSchema };
