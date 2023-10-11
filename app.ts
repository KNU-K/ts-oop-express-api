import express from "express";
import { ServerManager } from "./server-manager";
import { Route } from "./dto/config-dto";
import userController from "./controllers/user-controller";
import boardController from "./controllers/board-controller";
import { DB_URI } from "./configs/dotenv";
const app = express();
class App {
  private static routes: Route[] = [];
  public static main(): void {
    this.routes = [
      {
        url: "/user",
        module: userController,
      },
      {
        url: "/board",
        module: boardController,
      },
    ];

    const serverManager = new ServerManager({
      app: app,
      port: 8080,
      routes: this.routes,
      db_uri: DB_URI,
    });

    serverManager.run();
  }
}
App.main();
export { app };
