import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
// import authRouter from "./routes/auth";
// import tagsRouter from "./routes/tag";
// import articlesRouter from "./routes/articles";
// import usersRouter from "./routes/users";

const app = express();

/*CORS POLICY*/
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, PUT, POST, DELETE , OPTIONS",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/*BODY PARSER*/
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/*COOKI PARSER*/
app.use(cookieParser());

/*STATICS FILES*/
app.use(express.static(path.resolve(__dirname, "..", "public")));

/*ROUTES*/

// app.use("/auth", authRouter);
// app.use("/users", usersRouter);
// app.use("/tags", tagsRouter);
// app.use("/articles", articlesRouter);

/*Error Handling*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(500)
    .json({ mrssage: err.message ? err.message : "internal server error" });
});

export default app;
