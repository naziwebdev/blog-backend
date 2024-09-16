import { Router } from "express";
import auth from "../middlewares/auth";
import * as controller from "../controllers/users";
import { roleGurad } from "../middlewares/roleGuard";
import { multerStorage } from "../middlewares/uploaderConfigs";

const router: Router = Router();

const upload = multerStorage();

router.route("/").get(auth, roleGurad("admin"), controller.getAll);
router
  .route("/avatar")
  .post(auth, upload.single("avatar"), controller.uploadAvatar);
router.route("/:id").put(auth, controller.edit);
router.route("/edit-password").put(auth, controller.changePassword);

export default router;
