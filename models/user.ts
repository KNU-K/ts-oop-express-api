import mongoose, { Schema, Document, model } from "mongoose";

// ����� ��Ű�� ����
const userSchema = new Schema({
  userId: String,
  userPw: String,
  userName: String,
});

// ����� �������̽� ����
interface IUser extends Document {
  userId: string;
  userPw: string;
  userName: string;
}

// ����� �� ����
const User = model<IUser>("User", userSchema);

export default User;
