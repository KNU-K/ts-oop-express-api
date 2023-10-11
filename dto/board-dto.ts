import { Schema } from "mongoose";

interface BoardDto {
  no: number;
  title: string;
  content: string;
}

export { BoardDto };
