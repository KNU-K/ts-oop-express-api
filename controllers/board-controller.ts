import { Request, Response, Router } from "express";
import { BoardService } from "../services/board-service";
import { BoardDto } from "../dto/board-dto";

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

  private async findBoards(req: Request, res: Response) {
    res.send(await BoardService.findBoards());
  }

  private async findBoardById(req: Request, res: Response) {
    const boardId = req.params.boardId;
    res.send(await BoardService.findBoardById(boardId));
  }

  private async createBoard(req: Request, res: Response) {
    const { board, u_id } = req.body;
    console.log(board);
    const result: boolean = await BoardService.createBoard(board, u_id);

    if (result) {
      return res.send({ msg: "succeed" });
    } else {
      return res.send({ msg: "fail" });
    }
  }

  private async updateBoard(req: Request, res: Response) {
    const boardId: string | undefined = req.params.boardId;
    const board = req.body;

    res.send(await BoardService.updateBoard(boardId, board));
  }
  private async deleteBoard(req: Request, res: Response) {
    const boardId: string | undefined = req.params.boardId;

    res.send(await BoardService.deleteBoard(boardId));
  }
}

export default new BoardController().router;
