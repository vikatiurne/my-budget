import userController from "../controllers/user-controller";

const { Router } = require("express");

const router = new Router();

router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.get("/getUserById/:id", userController.getUserById);

export default router;
