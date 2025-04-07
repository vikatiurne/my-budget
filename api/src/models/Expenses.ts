import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  title: string;
  price: number;
  budget_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ExpenseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    budget_id: { type: mongoose.Types.ObjectId, ref: "Budget", required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
