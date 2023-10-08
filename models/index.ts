import mongoose from "mongoose";
import { userSchema } from "./user";

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
