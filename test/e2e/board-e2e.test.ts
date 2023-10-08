import request from "supertest";
import { app } from "../../app"; // Express ���ø����̼��� import
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

      // ������ POST ��û�� ���� ������ �����մϴ�.
      expect(response.status).toBe(200); // ���� ���, 201 Created ���� �ڵ�� ������ ����� �� �ֽ��ϴ�.
      expect(response.body).toEqual({ msg: "succeed" }); // ���� ������ "succeed" �޽����� �����ϴ��� Ȯ���մϴ�.
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
