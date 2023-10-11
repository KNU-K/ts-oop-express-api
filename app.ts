import express from "express";
import { ServerManager } from "./server-manager";
import { Route } from "./dto/config-dto";
import userController from "./controllers/user-controller";
import boardController from "./controllers/board-controller";
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
      db_uri: "mongodb+srv://root:root@cluster0.oxoj0ip.mongodb.net/test",
    });

    serverManager.run();
  }
}
App.main();
export { app };
