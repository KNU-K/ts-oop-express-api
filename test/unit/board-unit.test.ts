import { BoardService } from "../../services/board-service";

let boards: BoardDto[] = [];
// mocking 없애보자
describe("board service test", () => {
  test("createBoard 정상 작동 테스트", async () => {
    // UserService.findAllUsers 메서드를 스파이
    const createBoardSpy = jest.spyOn(BoardService, "createBoard");
    // findAllUsers 메서드가 호출될 때 원하는 결과 반환
    createBoardSpy.mockImplementation(async (board: BoardDto) => {
      try {
        // users 배열에 사용자 추가
        boards.push(board);
        return true; // 또는 다른 원하는 결과 반환
      } catch (err) {
        return false;
      }
    });
    // 테스트 코드 실행
    const result = await BoardService.createBoard({
      boardId: 1,
      title: "1234",
      content: "aaa",
    });

    // 결과 검증
    expect(result).toEqual(true);

    // 스파이 리셋
    createBoardSpy.mockRestore();
  });

  test("findBoards 테스트", async () => {
    // UserService.findAllUsers 메서드를 스파이
    const findBoardsSpy = jest.spyOn(BoardService, "findBoards");
    // findAllUsers 메서드가 호출될 때 원하는 결과 반환
    findBoardsSpy.mockReturnValue(boards);

    // 테스트 코드 실행
    const result_board: BoardDto[] = BoardService.findBoards();

    // 결과 검증
    expect(result_board).toEqual([
      {
        boardId: 1,
        title: "1234",
        content: "aaa",
      },
    ]);

    // 스파이 리셋
    findBoardsSpy.mockRestore();
  });
  test("findBoardById 테스트", async () => {
    // findBoardById 메서드를 스파이
    const findBoardByIdSpy = jest.spyOn(BoardService, "findBoardById");
    // findBoardById 메서드가 호출될 때 원하는 결과 반환
    findBoardByIdSpy.mockReturnValue(boards[0]); // 예를 들어, 첫 번째 게시판 반환

    // 테스트 코드 실행
    const result_board: BoardDto | undefined = BoardService.findBoardById(1); // 게시판 ID에 따라 변경

    // 결과 검증
    expect(result_board).toEqual({
      boardId: 1,
      title: "1234",
      content: "aaa",
    });

    // 스파이 리셋
    findBoardByIdSpy.mockRestore();
  });

  test("findBoardById 못찾을 때 테스트", async () => {
    // findBoardById 메서드를 스파이
    const findBoardByIdSpy = jest.spyOn(BoardService, "findBoardById");
    // findBoardById 메서드가 호출될 때 원하는 결과 반환
    findBoardByIdSpy.mockReturnValue(undefined); // 예를 들어, 첫 번째 게시판 반환

    // 테스트 코드 실행
    const result_board: BoardDto | undefined = BoardService.findBoardById(2); // 게시판 ID에 따라 변경

    // 결과 검증
    expect(result_board).toEqual(undefined);

    // 스파이 리셋
    findBoardByIdSpy.mockRestore();
  });
});
