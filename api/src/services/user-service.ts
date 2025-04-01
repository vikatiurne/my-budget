import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";

class UserService {
  loginUser = async (
    email: string,
    password: string
  ): Promise<IUser | null | undefined> => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User not found");
      }
      const compare = await bcrypt.compare(password, user?.password);
      if (!compare) throw new Error("Password is not correct");
      return user;
    } catch (error: any) {
      throw error;
    }
  };

  registrationUser = async (data: IUser): Promise<IUser | null | undefined> => {
    try {
      const pass = await bcrypt.hash(data.password, 7);
      data.password = pass;
      const newuser = new User(data);
      await newuser.save();
      const user = await User.findById(newuser._id);
      return user;
    } catch (error: any) {
      throw error;
    }
  };

  getUserById = async (id: string): Promise<IUser | null | undefined> => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw error;
    }
  };
}

export default new UserService();
