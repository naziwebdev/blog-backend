import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  id: yup.number().required("this field is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "format password is incorrect"
    )
    .required("this field is required"),
});

const editUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "at least char is 3")
    .max(50, "max char is 50")
    .required("name field is required"),
  username: yup
    .string()
    .min(3, "at least char is 3")
    .max(50, "max char is 50")
    .required("username field is required"),
  email: yup
    .string()
    .matches(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/)
    .required("email field is required"),
});

export { changePasswordSchema, editUserSchema };
