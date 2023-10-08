import request from "supertest";
import { app } from "../../app"; // Express 애플리케이션의 import
import { BoardDto } from "../../dto/board-dto";
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
describe("/board CRUD E2E Tests", () => {
  it("create board e2e test", async () => {
    for (const board of boardMockSchema) {
      const response = await request(app).post("/board").send(board);

      // 각각의 POST 요청에 대한 응답을 검증합니다.
      expect(response.status).toBe(200); // 예를 들어, 201 Created 상태 코드로 응답을 기대할 수 있습니다.
      expect(response.body).toEqual({ msg: "succeed" }); // 실제 응답이 "succeed" 메시지를 포함하는지 확인합니다.
    }
  });
  it("find all Board e2e test", async () => {
    const response = await request(app).get("/board");

    expect(response.body).toEqual(boardMockSchema);
  });

  it("find board e2e test", async () => {
    const response = await request(app).get("/board/1");

    expect(response.body).toEqual({
      boardId: 1,
      title: "12344",
      content: "aaa",
    });
  });

  it("find board that index is more than max index e2e test", async () => {
    const response = await request(app).get("/board/6");

    expect(response.body).toEqual({});
  });

  it("update board e2e test", async () => {
    const updatedData = {
      boardId: 1,
      title: "1",
      content: "a",
    };
    const response = await request(app).put("/board/1").send(updatedData);

    expect(response.body).toBe(true);

    const response1 = await request(app).get("/board/1");

    expect(response1.body).toEqual(updatedData);
  });

  it("delete board e2e test", async () => {
    const response = await request(app).delete("/board/1");
    expect(response.body).toBe(true);
    const response1 = await request(app).get("/board/1");

    expect(response1.body).toEqual({});
  });
});
