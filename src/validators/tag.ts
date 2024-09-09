import * as yup from "yup";

const tagSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "min char must be 3")
    .max(100, "max char must be 100")
    .required("title is required"),
});

export default tagSchema;
