import { Request, Response, Router } from "express";
import { UserDto } from "../dto/user-dto";
import { UserService } from "../services/user-service";

class UserController {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.findAllUsers);
    this.router.get("/:userId", this.findUserById);
    this.router.post("/", this.createUser);
    this.router.put("/:userId", this.updateUser);
    this.router.delete("/:userId", this.deleteUser);
  }

  private async findAllUsers(req: Request, res: Response) {
    res.send(await UserService.findAllUsers());
  }

  private async findUserById(req: Request, res: Response) {
    const userId: string | undefined = req.params.userId;
    res.send(await UserService.findUserById(userId));
  }

  private async createUser(req: Request, res: Response) {
    const user: UserDto = req.body;
    const result: boolean = await UserService.createUser(user);

    if (result) {
      return res.send({ msg: "succeed" });
    } else {
      return res.send({ msg: "fail" });
    }
  }

  private async updateUser(req: Request, res: Response) {
    const user: UserDto = req.body;
    const userId: string | undefined = req.params.userId;
    const result = await UserService.updateUser(userId, user);
    return res.send(result);
  }
  private async deleteUser(req: Request, res: Response) {
    const userId: string | undefined = req.params.userId;
    const result = await UserService.deleteUser(userId);
    return res.send(result);
  }
}

export default new UserController().router;
