import mongoose, { Schema, Document, model } from "mongoose";

// 사용자 스키마 정의
const boardSchema = new Schema({
  no: { type: Number, unique: true, sparse: true },
  title: String,
  content: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

// 사용자 인터페이스 정의
interface IBoard extends Document {
  no: number;
  title: string;
  content: string;
  owner: Schema.Types.ObjectId;
}

// 사용자 모델 생성
const Board = model<IBoard>("Board", boardSchema);

export default Board;
