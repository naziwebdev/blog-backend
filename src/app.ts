import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import {findById} from "./repositories/users";


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

app.use('/test' ,async (req: Request, res: Response) => {

  const result = await findById(17)
  return res.json(result)
})

/*Error Handling*/
app.use((err: Error, req: Request, res: Response) => {
  return res.status(500).json({ mrssage: err.message });
});

export default app;
