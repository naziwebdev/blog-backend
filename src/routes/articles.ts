import { Router } from "express";
import * as controller from "../controllers/articles";
import auth from "../middlewares/auth";
import { roleGurad } from "../middlewares/roleGuard";
import { multerStorage } from "../middlewares/uploaderConfigs";

const router: Router = Router();

const uploader = multerStorage();

router.route("/search").get(controller.searchArticles);
router
  .route("/")
  .get(controller.getAll)
  .post(auth, roleGurad("admin"), uploader.single("cover"), controller.create);
router.route("/:slug").get(controller.getBySlug);
router
  .route("/:id")
  .put(auth, roleGurad("admin"), uploader.single("cover"), controller.edit)
  .delete(auth, roleGurad("admin"), controller.remove);

export default router;
