import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
// router.post("/login", userController.login);
router.get("/users", userController.getAllUsers);

export default router;
