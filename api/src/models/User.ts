import mongoose, { Document, Schema } from "mongoose";

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


const User = mongoose.model<IUser>("User", UserSchema)

export default User