import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userInterface";

interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  gender:{type:String},
  dept: { type: String },
  studentID: { type: String, unique: true },
  password:{ type: String},
  email: { type: String, required: true, unique: true },
  phone: { type: String},
  imageUrl: { type: String},
  role:{type:String,default:"user"}
});

const UserModel = mongoose.model<IUserModel>("User", UserSchema);
export default UserModel;
