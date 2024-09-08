import { Router } from "express";
import * as controller from "../controllers/auth";

const router: Router = Router();

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/me").get(controller.getMe);
router.route("/refresh").post(controller.refresh);
router.route("/logout").post(controller.logOut);

export default router;
