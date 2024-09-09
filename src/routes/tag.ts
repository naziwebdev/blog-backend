import { Router } from "express";
import * as controller from "../controllers/tag";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

const router: Router = Router();

router.route("/").post(auth,isAdmin,controller.create).get(controller.getAll);
router.route("/:id").delete(auth,isAdmin,controller.remove).put(auth,isAdmin,controller.edit);
router.route("/:slug").get(controller.findtagsArticles);

export default router;
