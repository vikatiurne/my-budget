import mongoose, { Document, Schema } from "mongoose";

export interface IDate {
  mounth: number;
  year: number;
}

export interface IBudget extends Document {
  budget: number;
  savings: number;
  user_id: mongoose.Types.ObjectId;
  date: IDate;
  createdAt: string;
}

const BudgetSchema: Schema = new Schema(
  {
    budget: { type: Number, required: true },
    savings: { type: Number, required: true, default: 0 },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    date: { type: { mounth: String, year: String }, required: true },
  },
  { timestamps: true }
);

const Budget = mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
