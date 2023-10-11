import { BoardDto } from "../dto/board-dto";
import Board from "../models/board";

class BoardService {
  private static boards: any[] = [];
  public static initBoard(boards) {
    this.boards = boards;
  }
  static async createBoard(board: BoardDto, u_id: string): Promise<boolean> {
    try {
      console.log(this.boards.length);
      const createdData = {
        no:
          this.boards.length === 0
            ? 1
            : this.boards[this.boards.length - 1].no + 1,
        ...board,
        owner: u_id,
      };
      console.log(createdData);
      const newBoard = new Board(createdData);
      await newBoard.save();
      this.boards.push(newBoard);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  static async findBoardById(boardId: string) {
    return this.boards.find((board) => board._id == boardId);
  }
  public static async findBoards(): Promise<BoardDto[]> {
    return this.boards;
  }
  public static async updateBoard(boardId: string, updatedBoard) {
    await Board.updateOne({ _id: boardId }, updatedBoard);
    const board = this.boards.find((board) => boardId == board.boardId);
    if (board) {
      board.title = updatedBoard.title;
      board.content = updatedBoard.content;
      return true;
    } else {
      return false;
    }
  }

  public static async deleteBoard(boardId: string) {
    try {
      if (!this.findBoardById(boardId)) return false;

      await Board.deleteOne({ _id: boardId });
      this.boards = this.boards.filter((board) => boardId != board._id);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export { BoardService };
