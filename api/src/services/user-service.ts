import User, { IUser } from "../models/User";

class UserService {
  loginUser = async (email: string): Promise<IUser | null | undefined> => {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error: any) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  };

  registrationUser = async (data: IUser): Promise<IUser | null | undefined> => {
    try {
      const newuser = new User(data);
      await newuser.save();
      const user = await User.findById(newuser._id);
      return user;
    } catch (error: any) {
      throw new Error(`Error registration user: ${error.message}`);
    }
  };
}

export default new UserService();
