let boards: BoardDto[] = [];
class BoardService {
  static async createBoard(board: BoardDto): Promise<boolean> {
    try {
      boards.push(board);
      return true;
    } catch (err) {
      return false;
    }
  }
  static findBoardById(boardId: number): BoardDto | undefined {
    return boards.find((board) => board.boardId == boardId);
  }
  public static findBoards(): BoardDto[] {
    return boards;
  }
  public static async updateBoard(boardId: number, updatedBoard: BoardDto) {
    const board = boards.find((board) => boardId == board.boardId);
    if (board) {
      board.title = updatedBoard.title;
      board.content = updatedBoard.content;
      return true;
    } else {
      return false;
    }
  }

  public static async deleteBoard(boardId: number) {
    try {
      if (!this.findBoardById(boardId)) return false;
      boards = boards.filter((board) => boardId != board.boardId);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export { BoardService };
