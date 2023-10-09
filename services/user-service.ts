import { connect } from "mongoose";
import { UserDto } from "../dto/user-dto";
import User from "../models/user";

class UserService {
  private static users: UserDto[] = [];
  public static initUser(users) {
    this.users = users;
  }
  public static async createUser(user: UserDto): Promise<boolean> {
    try {
      const newUser = new User(user);
      await newUser.save();
      this.users.push(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  public static findAllUsers() {
    return this.users;
  }
  public static findUserById(userId: string) {
    const user: UserDto | undefined = this.users.find(
      (user: UserDto) => user.userId === userId
    );
    if (user) return user;
    else return null;
  }
  public static async updateUser(userId: string, updatedUser: UserDto) {
    await User.updateOne(
      { userId: userId },
      {
        userPw: updatedUser.userPw,
        userName: updatedUser.userName,
      }
    );
    const userToUpdate = this.users.find((user) => user.userId === userId);
    if (userToUpdate) {
      userToUpdate.userPw = updatedUser.userPw;
      userToUpdate.userName = updatedUser.userName;
      return true;
    }
    return false;
  }
  public static async deleteUser(userId: string) {
    try {
      await User.deleteOne({ userId: userId });
      this.users = this.users.filter((user) => user.userId != userId);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export { UserService };
