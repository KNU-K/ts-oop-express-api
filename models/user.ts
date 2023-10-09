import mongoose, { Schema, Document, model } from "mongoose";

// 사용자 스키마 정의
const userSchema = new Schema({
  userId: String,
  userPw: String,
  userName: String,
});

// 사용자 인터페이스 정의
interface IUser extends Document {
  userId: string;
  userPw: string;
  userName: string;
}

// 사용자 모델 생성
const User = model<IUser>("User", userSchema);

export default User;
