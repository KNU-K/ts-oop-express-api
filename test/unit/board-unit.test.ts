import { BoardService } from "../../services/board-service";

let boards: BoardDto[] = [];
const boardMockSchema: BoardDto[] = [
  {
    boardId: 1,
    title: "12344",
    content: "aaa",
  },
  {
    boardId: 2,
    title: "1234",
    content: "bbb",
  },
  {
    boardId: 3,
    title: "1234",
    content: "ccc",
  },
  {
    boardId: 4,
    title: "1234",
    content: "ddd",
  },
];
// mocking 없애보자
describe("board service test", () => {
  test("createBoard 정상 작동 테스트", async () => {
    boardMockSchema.map(async (board) => {
      const result = await BoardService.createBoard(board);
      expect(result).toEqual(true);
    });
  });

  test("findBoards 테스트", async () => {
    // 테스트 코드 실행
    const result_board: BoardDto[] = BoardService.findBoards();

    // 결과 검증
    expect(result_board).toEqual(boardMockSchema);
  });
  test("findBoardById 테스트", async () => {
    // findBoardById 메서드를 스파이
    boardMockSchema.map((board) => {
      const result_board: BoardDto | undefined = BoardService.findBoardById(
        board.boardId
      ); // 게시판 ID에 따라 변경
      // 결과 검증
      expect(result_board).toEqual(board);
    });
  });

  test("findBoardById 못찾을 때 테스트", async () => {
    // 테스트 코드 실행
    const result_board: BoardDto | undefined = BoardService.findBoardById(100); // 게시판 ID에 따라 변경

    // 결과 검증
    expect(result_board).toEqual(undefined);
  });
});
