import exp from "constants";
import { UserDto } from "../../dto/user-dto";
import { UserService } from "../../services/user-service";
let users: UserDto[] = [];
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
describe("user service test", () => {
  test("createUser 정상 작동 테스트", async () => {
    // 테스트 코드 실행
    userMockSchema.map(async (user) => {
      const result = await UserService.createUser(user);
      expect(result).toEqual(true);
    });
    // 결과 검증
  });
  test("findAllUsers 오류 작동 테스트", async () => {
    const result = UserService.findAllUsers();
    // 결과 검증
    expect(result).toEqual(userMockSchema);
  });

  test("findUserById 정상 작동 테스트", async () => {
    userMockSchema.map((user) => {
      const result = UserService.findUserById(user.userId);
      expect(result).toEqual(user);
    });
  });

  test("findUserById 없는 아이디 일 때 작동 테스트", async () => {
    const result = UserService.findUserById("1");

    expect(result).toEqual(null);
  });

  test("updateUser 테스트", async () => {
    const result = await UserService.updateUser("as123", {
      userId: "as123",
      userPw: "1",
      userName: "d",
    });
    expect(result).toBe(true);
  });
  test("update 후 User find 테스트", async () => {
    const result = await UserService.findAllUsers();
    expect(result).toEqual([
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
        userPw: "1",
        userName: "d",
      },
    ]);
  });

  test("deleteUser 테스트후 User 정보 확인", async () => {
    const result = await UserService.deleteUser("asd13");
    const result_users = UserService.findAllUsers();
    expect(result_users).toEqual([
      {
        userId: "asd123",
        userPw: "1234",
        userName: "asd",
      },
      {
        userId: "as123",
        userPw: "1",
        userName: "d",
      },
    ]);
  });
});
