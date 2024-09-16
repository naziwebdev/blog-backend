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

export { changePasswordSchema };
