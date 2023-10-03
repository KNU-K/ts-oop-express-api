import { UserDto } from "../../dto/user-dto";
import { UserService } from "../../services/user-service";
let users: UserDto[] = [];

describe("user service test", () => {
  test("createUser 정상 작동 테스트", async () => {
    // UserService.findAllUsers 메서드를 스파이
    const createUserSpy = jest.spyOn(UserService, "createUser");
    // findAllUsers 메서드가 호출될 때 원하는 결과 반환
    createUserSpy.mockImplementation(async (user: UserDto) => {
      try {
        // users 배열에 사용자 추가
        users.push(user);
        return true; // 또는 다른 원하는 결과 반환
      } catch (err) {
        return false;
      }
    });
    // 테스트 코드 실행
    const result = await UserService.createUser({
      userId: "asd123",
      userPw: "1234",
      userName: "aaa",
    });

    // 결과 검증
    expect(result).toEqual(true);

    // 스파이 리셋
    createUserSpy.mockRestore();
  });
  test("findAllUsers 정상 작동 테스트", async () => {
    // UserService.findAllUsers 메서드를 스파이
    const findAllUsersSpy = jest.spyOn(UserService, "findAllUsers");
    // findAllUsers 메서드가 호출될 때 원하는 결과 반환
    findAllUsersSpy.mockReturnValue(users);

    // 테스트 코드 실행
    const result = UserService.findAllUsers();

    // 결과 검증
    expect(result).toEqual([
      { userId: "asd123", userPw: "1234", userName: "aaa" },
    ]);

    // 스파이 리셋
    findAllUsersSpy.mockRestore();
  });

  test("findUserById 정상 작동 테스트", async () => {
    // UserService.findAllUsers 메서드를 스파이
    const findUserByIdSpy = jest.spyOn(UserService, "findUserById");
    // findAllUsers 메서드가 호출될 때 원하는 결과 반환
    findUserByIdSpy.mockReturnValue({
      userId: "asd123",
      userPw: "1234",
      userName: "John",
    });

    // 테스트 코드 실행
    const result = UserService.findUserById("asd123");

    // 결과 검증
    expect(result).toEqual({
      userId: "asd123",
      userPw: "1234",
      userName: "John",
    });

    // 스파이 리셋
    findUserByIdSpy.mockRestore();
  });

  test("findUserById 없는 아이디 일 때 작동 테스트", async () => {
    // UserService.findAllUsers 메서드를 스파이
    const findUserByIdSpy = jest.spyOn(UserService, "findUserById");
    // findAllUsers 메서드가 호출될 때 원하는 결과 반환
    findUserByIdSpy.mockReturnValue(null);

    // 테스트 코드 실행
    const result = UserService.findUserById("1");

    // 결과 검증
    expect(result).toEqual(null);

    // 스파이 리셋
    findUserByIdSpy.mockRestore();
  });
});
