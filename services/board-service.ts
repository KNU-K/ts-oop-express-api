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
}

export { BoardService };
