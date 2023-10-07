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
  test("createUser ?��?�� ?��?�� ?��?��?��", async () => {
    // ?��?��?�� 코드 ?��?��
    userMockSchema.map(async (user) => {
      const result = await UserService.createUser(user);
      expect(result).toEqual(true);
    });
    // 결과 �?�?
  });
  test("findAllUsers ?���? ?��?�� ?��?��?��", async () => {
    const result = await UserService.findAllUsers();
    // 결과 �?�?
    expect(result).toEqual(userMockSchema);
  });

  test("findUserById ?��?�� ?��?�� ?��?��?��", async () => {
    userMockSchema.map(async (user) => {
      const result = await UserService.findUserById(user.userId);
      expect(result).toEqual(user);
    });
  });

  test("findUserById ?��?�� ?��?��?�� ?�� ?�� ?��?�� ?��?��?��", async () => {
    const result = await UserService.findUserById("1");

    expect(result).toEqual(null);
  });

  test("updateUser ?��?��?��", async () => {
    const result = await UserService.updateUser("as123", {
      userId: "as123",
      userPw: "1",
      userName: "d",
    });
    expect(result).toBe(true);
  });
  test("update ?�� User find ?��?��?��", async () => {
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

  test("deleteUser ?��?��?��?�� User ?���? ?��?��", async () => {
    const result = await UserService.deleteUser("asd13");
    const result_users = await UserService.findAllUsers();
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
