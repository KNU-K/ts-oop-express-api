import { Request, Response, Router } from "express";
import { BoardService } from "../services/board-service";

class BoardController {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.findBoards);
    this.router.get("/:boardId", this.findBoardById);
    this.router.post("/", this.createBoard);
    //this.router.put("/:boardId", this.updateBoard);
    //this.router.delete("/:boardId", this.deleteBoard);
  }

  private findBoards(req: Request, res: Response) {
    res.send(BoardService.findBoards());
  }

  private findBoardById(req: Request, res: Response) {
    const { boardId } = req.body;
    res.send(BoardService.findBoardById(boardId));
  }

  private async createBoard(req: Request, res: Response) {
    const board: BoardDto = req.body;
    const result: boolean = await BoardService.createBoard(board);

    if (result) {
      return res.send({ msg: "succeed" });
    } else {
      return res.send({ msg: "fail" });
    }
  }

  // private updateBoard(req: Request, res: Response) {}
  //  private deleteBoard(req: Request, res: Response) {}
}

export default new BoardController().router;