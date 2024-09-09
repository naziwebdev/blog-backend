import { Router } from "express";
import * as controller from "../controllers/tag";

const router: Router = Router();

router.route("/").post(controller.create).get(controller.getAll);
router.route("/:id").delete(controller.remove).put(controller.edit);
router.route("/:slug").get(controller.findtagsArticles);

export default router;
