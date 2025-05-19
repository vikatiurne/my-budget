import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  title: string;
  price: number;
  budget_id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ExpenseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    budget_id: { type: mongoose.Types.ObjectId, ref: "Budget", required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
