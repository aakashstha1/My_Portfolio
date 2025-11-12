import express from "express";

import { authentication } from "../middleware/authentication.js";
import { upload } from "../middleware/multerAsCloudinary.js";
import {
  addAchievement,
  deleteAchievement,
  getAllAchievements,
} from "../controllers/achievement.controller.js";

const router = express.Router();

router
  .route("/add")
  .post(authentication, upload.single("imgURL"), addAchievement);
router.route("/get").get(getAllAchievements);
router.route("/:achievementId").delete(authentication, deleteAchievement);

export default router;
