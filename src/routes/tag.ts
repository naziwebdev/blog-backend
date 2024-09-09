import { Router } from "express";
import * as controller from "../controllers/tag";
import auth from "../middlewares/auth";

const router: Router = Router();

router.route("/").post(controller.create).get(auth,controller.getAll);
router.route("/:id").delete(controller.remove).put(controller.edit);
router.route("/:slug").get(controller.findtagsArticles);

export default router;
