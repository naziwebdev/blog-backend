import { Router } from "express";
import * as controller from "../controllers/auth";
import auth from "../middlewares/auth";
import { multerStorage } from "../middlewares/uploaderConfigs";

const router: Router = Router();



router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/me").get(auth,controller.getMe);
router.route("/refresh").post(auth,controller.refresh);
router.route("/logout").post(auth,controller.logOut);

export default router;
