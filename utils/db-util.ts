import { connect } from "mongoose";
import { UserDto } from "../dto/user-dto";
import User from "../models/user";
import { UserService } from "../services/user-service";
import Board from "../models/board";
import { BoardService } from "../services/board-service";

class DBUtil {
  private uri: string;
  constructor(uri) {
    this.uri = uri;
    this.connect();
    this.rebaseSchema();
  }

  public async connect() {
    try {
      await connect(this.uri);
      console.log("db connect succeed");
    } catch (err) {
      console.log("db connect fail");
    }
  }
  private async rebaseSchema() {
    try {
      const findUsers: UserDto[] = (await User.find()).map((user) => ({
        userId: user.userId,
        userPw: user.userPw,
        userName: user.userName,
      }));
      console.log(findUsers);
      UserService.initUser(findUsers);

      const findBoards = await Board.find();
      console.log(findBoards);

      BoardService.initBoard(findBoards);

      console.log("user table loading succeed");
      console.log("board table loading succeed");
    } catch (err) {
      console.log("table loading err");
    }
  }
}

export { DBUtil };
