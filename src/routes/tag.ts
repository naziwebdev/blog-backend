import { Router } from "express";
import * as controller from "../controllers/tag";
import auth from "../middlewares/auth";
import { roleGurad } from "../middlewares/roleGuard";

const router: Router = Router();


router.route("/").post(auth,roleGurad("admin"),controller.create).get(controller.getAll)
router.route("/:slug").get(controller.findtagsArticles);
router.route("/:id").delete(auth,roleGurad("admin"),controller.remove).put(auth,roleGurad("admin"),controller.edit);


export default router;
