import { UserDto } from "../dto/user-dto";

let users: UserDto[] = [];

class UserService {
  public static async createUser(user: UserDto): Promise<boolean> {
    try {
      users.push(user);
      return true;
    } catch (err) {
      return false;
    }
  }
  public static findAllUsers() {
    return users;
  }
  public static findUserById(userId: string) {
    const user: UserDto | undefined = users.find(
      (user: UserDto) => user.userId === userId
    );
    if (user) return user;
    else return null;
  }
}

export { UserService };
