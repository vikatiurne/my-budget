import userRouter from "./user-router";
import budgetRouter from "./budget-router";
import expenseRouter from "./expense-router";
import travelCostRouter from "./travelcost-router";
import incomeRouter from "./income-router";

const { Router } = require("express");

const router = new Router();

router.use("/user", userRouter);
router.use("/budget", budgetRouter);
router.use("/expense", expenseRouter);
router.use("/calculation", travelCostRouter);
router.use("/income", incomeRouter);

export default router;
