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
    // GET / 贸府 肺流
  }

  private login(req: Request, res: Response) {
    // POST /login 贸府 肺流
  }

  private logout(req: Request, res: Response) {
    // POST /logout 贸府 肺流
  }
}

const myRouter = new MyRouter();
export default myRouter.router;
