import mongoose, { Document, Schema } from "mongoose";

export interface ITravelCosts extends Document {
  title: string;
  budget_id?: mongoose.Types.ObjectId;
  user_id: string;
  accommodationCost: number;
  transportCost: number;
  greencardCost: number;
  healthInsuranceCost: number;
  roadTaxCost: number;
  sightseeingCost: number;
  foodCost: number;
  activitiesCost: number;
  extra: number;
  total: number;
}

const TravelCostSchema: Schema = new Schema<ITravelCosts>({
  title: { type: String, required: true },
  budget_id: { type: mongoose.Types.ObjectId },
  user_id: { type: String },
  accommodationCost: { type: Number },
  transportCost: { type: Number },
  greencardCost: { type: Number },
  healthInsuranceCost: { type: Number },
  roadTaxCost: { type: Number },
  sightseeingCost: { type: Number },
  foodCost: { type: Number },
  activitiesCost: { type: Number },
  extra: { type: Number },
  total: { type: Number, required: true },
});

const TravelCost = mongoose.model<ITravelCosts>("travelcost", TravelCostSchema);

export default TravelCost;
