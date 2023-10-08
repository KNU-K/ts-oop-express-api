import { Request, Response, Router } from "express";

class MyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.index);
    this.router.post("/login", this.login);
    this.router.post("/logout", this.logout);
  }

  private index(req: Request, res: Response) {
    // GET / ó�� ����
  }

  private login(req: Request, res: Response) {
    // POST /login ó�� ����
  }

  private logout(req: Request, res: Response) {
    // POST /logout ó�� ����
  }
}

const myRouter = new MyRouter();
export default myRouter.router;
