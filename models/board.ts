import mongoose, { Schema, Document, model } from "mongoose";

// ����� ��Ű�� ����
const boardSchema = new Schema({
  no: { type: Number, unique: true, sparse: true },
  title: String,
  content: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

// ����� �������̽� ����
interface IBoard extends Document {
  no: number;
  title: string;
  content: string;
  owner: Schema.Types.ObjectId;
}

// ����� �� ����
const Board = model<IBoard>("Board", boardSchema);

export default Board;
