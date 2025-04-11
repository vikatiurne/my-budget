import mongoose, { Document, Schema } from "mongoose";

export interface ITransport {
  typeofTransport: string;
  price: number;
}

const TransportSchema: Schema = new Schema({
  typeofTransport: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface IAccommodation {
  nameHotel: string;
  price: number;
}

const AccommodationSchema: Schema = new Schema({
  nameHotel: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface IRoadTax {
  country: string;
  price: number;
}

const RoadTaxSchema: Schema = new Schema({
  country: { type: String, required: true },
  price: { type: Number, required: true },
});
export interface ISightseeing {
  landmark: string;
  price: number;
}

const SightseeingSchema: Schema = new Schema({
  landmark: { type: String, required: true },
  price: { type: Number, required: true },
});
export interface IFoodOptions {
  eateries: string;
  price: number;
}
const FoodOptionsSchema: Schema = new Schema({
  eateries: { type: String, required: true },
  price: { type: Number, required: true },
});
export interface IActivities {
  typeofactivities: string;
  price: number;
}
const ActivitiesSchema: Schema = new Schema({
  typeofactivities: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface ITravelCosts extends Document {
  title: string;
  accommodation: IAccommodation[];
  transport: ITransport[];
  greencard?: number;
  healthInsuranse?: number;
  roadTax?: IRoadTax;
  sightseeing?: ISightseeing;
  foodOptions?: IFoodOptions;
  activities?: IActivities;
  extra?: number;
  total: number;
  budget_id?: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
}

const TravelCostSchema: Schema = new Schema<ITravelCosts>({
  title: { type: String, required: true },
  accommodation: { type: [AccommodationSchema], required: true },
  transport: { type: [TransportSchema], required: true },

  greencard: { type: Number },
  healthInsuranse: { type: Number },
  roadTax: { type: [RoadTaxSchema] },
  sightseeing: { type: [SightseeingSchema] },
  foodOptions: { type: FoodOptionsSchema },
  activities: { type: ActivitiesSchema },
  extra: { type: Number },
  total: { type: Number, required: true },
  budget_id: { type: mongoose.Types.ObjectId },
  user_id: { type: mongoose.Types.ObjectId },
});

const TravelCost = mongoose.model<ITravelCosts>("travelcost", TravelCostSchema);

export default TravelCost;
