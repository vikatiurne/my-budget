import userController from "../controllers/user-controller";

const { Router } = require("express");

const router = new Router();

router.post("/login", userController.login);
router.post("/registration", userController.registration);

export default router
