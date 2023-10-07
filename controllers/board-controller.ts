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
    this.router.put("/:boardId", this.updateBoard);
    this.router.delete("/:boardId", this.deleteBoard);
  }

  private findBoards(req: Request, res: Response) {
    res.send(BoardService.findBoards());
  }

  private findBoardById(req: Request, res: Response) {
    const boardId: any = req.query.boardId;
    res.send(BoardService.findBoardById(boardId));
  }

  private async createBoard(req: Request, res: Response) {
    const board: any = req.body;
    const result: boolean = await BoardService.createBoard(board);

    if (result) {
      return res.send({ msg: "succeed" });
    } else {
      return res.send({ msg: "fail" });
    }
  }

  private async updateBoard(req: Request, res: Response) {
    const boardId: any = req.query.boardId;
    const { board } = req.body;

    res.send(await BoardService.updateBoard(boardId, board));
  }
  private async deleteBoard(req: Request, res: Response) {
    const boardId: any = req.query.boardId;

    res.send(await BoardService.deleteBoard(boardId));
  }
}

export default new BoardController().router;
