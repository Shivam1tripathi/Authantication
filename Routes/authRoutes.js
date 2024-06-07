import Express from "express";
import { forgetPasswordController, loginController, registerController ,updateProfileController} from "../Controller/authcontroller.js";

const router=Express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.post("/forgetpassword",forgetPasswordController);
router.put("/profile",updateProfileController);

export default router