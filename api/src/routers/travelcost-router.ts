import travelcostController from "../controllers/travelcost-controller"

const { Router } = require("express")

const router = new Router()

router.get("/getCalculation/:id", travelcostController.getCalculationById)
router.get("/getAllCalculations", travelcostController.getListCalculation)
router.post("/createCalculation", travelcostController.createTravelCost)
router.put("/updateCalculation/:id", travelcostController.updateTravelCost)
router.delete("/removeCalculation/:id", travelcostController.deleteCalculationById)

export default router