import incomeController from "../controllers/income-controller";

const { Router } = require("express");

const router = new Router();

router.get("/getIncomes/:budgetId", incomeController.getIncomes);
router.post("/createIncome", incomeController.createIncome);
router.put("/updateIncome/:incomeId", incomeController.updateIncomes);

export default router;
