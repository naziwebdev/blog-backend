import * as yup from "yup";

const articleSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "must be at least 3 char")
    .max(255, "max char must be 255")
    .required("title is required"),
  content: yup
    .string()
    .min(100, "must be at least 3 char")
    .required("content is required"),
  slug: yup
    .string()
    .min(3, "must be at least 3 char")
    .max(50, "max char must be 255")
    .required("slug is required"),
});

export default articleSchema;
