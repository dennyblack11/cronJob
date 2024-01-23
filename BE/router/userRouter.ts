import { Router } from "express";
import {
  subForThreeMonth,
  createUser,
  searchAll,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/upgrade-user-plan").patch(subForThreeMonth);
router.route("/all").get(searchAll);

export default router;
