import userRouter from "./user-router";
import budgetRouter from "./budget-router";
import expenseRouter from "./expense-router";

const { Router } = require("express");

const router = new Router();

router.use("/user", userRouter);
router.use("/budget", budgetRouter);
router.use("/expense", expenseRouter);

export default router;
