import budgetController from "../controllers/budget-controller";

const { Router } = require("express");

const router = new Router();

router.get("/getBudget/:userId", budgetController.getBudget);
router.get("/getBudgetById/:budgetId", budgetController.getBudgetById);
router.get("/getAllBudgets/:userId", budgetController.getAllBudgets);
router.get("/getStatsBudget/:userId", budgetController.getStatsForPeriod);
router.post("/createBudget", budgetController.addBudget);
router.put("/updateBudget/:budgetId", budgetController.updateBudget);

export default router;
