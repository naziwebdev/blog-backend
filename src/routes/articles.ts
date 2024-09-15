import { Router } from "express";
import * as controller from "../controllers/articles";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";
import { multerStorage } from "../middlewares/uploaderConfigs";

const router: Router = Router();

const uploader = multerStorage();

router
  .route("/")
  .get(controller.getAll)
  .post(auth, isAdmin, uploader.single("cover"), controller.create);
router.route("/:slug").get(controller.getBySlug);
router
  .route("/:id")
  .put(auth, isAdmin, uploader.single("cover"), controller.edit)
  .delete(auth, isAdmin, controller.remove);

export default router;
