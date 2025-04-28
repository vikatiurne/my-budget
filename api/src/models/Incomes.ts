import mongoose, { Document, Schema } from "mongoose";

export interface IIncome extends Document {
  title: string;
  price: number;
  budget_id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const IncomeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    budget_id: { type: mongoose.Types.ObjectId, ref: "Budget", required: true },
  },
  { timestamps: true }
);

const Income = mongoose.model<IIncome>("Income", IncomeSchema);

export default Income;