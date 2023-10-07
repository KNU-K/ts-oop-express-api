import request from "supertest";
import { app } from "../../app"; // Express 애플리케이션의 import
import { UserDto } from "../../dto/user-dto";
const userMockSchema: UserDto[] = [
  {
    userId: "asd123",
    userPw: "1234",
    userName: "asd",
  },
  {
    userId: "asd13",
    userPw: "123",
    userName: "sd",
  },
  {
    userId: "as123",
    userPw: "124",
    userName: "ad",
  },
];
describe("/user CRUD E2E Tests", () => {
  it("create user e2e test", async () => {
    for (const user of userMockSchema) {
      const response = await request(app).post("/user").send(user);

      // 각각의 POST 요청에 대한 응답을 검증합니다.
      expect(response.status).toBe(200); // 예를 들어, 201 Created 상태 코드로 응답을 기대할 수 있습니다.
      expect(response.body).toEqual({ msg: "succeed" }); // 실제 응답이 "succeed" 메시지를 포함하는지 확인합니다.
    }
  });
  it("find all User e2e test", async () => {
    const response = await request(app).get("/user");

    expect(response.body).toEqual(userMockSchema);
  });

  it("find user e2e test", async () => {
    const response = await request(app).get(`/user/asd123`);

    expect(response.body).toEqual({
      userId: "asd123",
      userPw: "1234",
      userName: "asd",
    });
  });
  // 추가 테스트 케이스 작성
  it("update user e2e test & 결과확인", async () => {
    const response = await request(app).put("/user/as123").send({
      userId: "as123",
      userPw: "1233334",
      userName: "ad",
    });

    expect(response.body).toBe(true);
    const response2 = await request(app).get("/user");
    expect(response2.body).not.toEqual(userMockSchema);
  });

  // 추가 테스트 케이스 작성
  it("delete user e2e test & 결과확인", async () => {
    const response = await request(app).delete("/user/as123");
    expect(response.body).toBe(true);
    const response2 = await request(app).get("/user/as123");
    expect(response2.body).toBeUndefined;
  });
});
