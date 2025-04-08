import expenseController from "../controllers/expense-controller";

const { Router } = require("express");

const router = new Router();

router.get(
  "/getExpenses/:userId/budget/:budgetId",
  expenseController.getExpenses
);
router.get("/getDayStatsExpenses/:userId", expenseController.getStatsForDay);
router.get(
  "/getPeriodStatsExpenses/:userId",
  expenseController.getStatsForPeriod
);
router.post("/createExpense", expenseController.createExpense);
router.put("/updateExpense/:id/:budgetId", expenseController.updateExpense);
router.delete("/deleteExpense/:id", expenseController.deleteExpense);

export default router;
