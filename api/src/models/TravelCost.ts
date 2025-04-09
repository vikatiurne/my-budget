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

export interface ITravelCosts extends Document {
  title: string;
  accommodation: IAccommodation[];
  transport: ITransport[];
  extra?: number;
  total: number;
  budget_id?: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
}


const TravelCostSchema: Schema = new Schema<ITravelCosts>({
  title: { type: String, required: true },
  accommodation: { type: [AccommodationSchema], required: true },
  transport: { type: [TransportSchema], required: true },
  extra: { type: Number, required: true },
  total: { type: Number, required: true },
  budget_id: { type: mongoose.Types.ObjectId },
  user_id: { type: mongoose.Types.ObjectId },
});

const TravelCost = mongoose.model<ITravelCosts>("travelcost", TravelCostSchema);

export default TravelCost;
