import mongoose, { Document, Schema } from "mongoose";
import Budget from "./Budget";
import Expense from "./Expenses";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^.+@\S+\.\S+$/ },
  password: { type: String, required: true },
});

UserSchema.pre("deleteOne", async function (next: any) {
  try {
    const UserModel = this.model;
    const user = await UserModel.findById(this.getQuery()["_id"]);

    if (user) {
      await Budget.deleteMany({ user_id: user._id });
      await Expense.deleteMany({ user_id: user._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
