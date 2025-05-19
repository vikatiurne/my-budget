import mongoose, { Document, Schema } from "mongoose";

export interface IDate {
  mounth: string;
  year: string;
}

export interface IBudget extends Document {
  name: string;
  budget: number;
  user_id: mongoose.Types.ObjectId;
  date: IDate;
  createdAt: string;
}

const BudgetSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    budget: { type: Number, required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    date: { type: { mounth: String, year: String }, required: true },
  },
  { timestamps: true }
);

const Budget = mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
