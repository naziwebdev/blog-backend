import * as yup from "yup";

const articleSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title max char must be 255")
    .required("title is required"),
  content: yup
    .string()
    .min(20, "content must be at least 20 char")
    .required("content is required"),
  slug: yup
    .string()
    .min(3, "slug must be at least 3 char")
    .max(50, "slug max char must be 50")
    .required("slug is required"),
  tags: yup.array().optional(),
});

export default articleSchema;
