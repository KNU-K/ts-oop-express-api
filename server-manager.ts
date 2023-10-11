import express, { Application } from "express";
import { Config, Route } from "./dto/config-dto";
import mongoose, { ConnectOptions, connect } from "mongoose";
import User from "./models/user";
import { UserService } from "./services/user-service";
import { UserDto } from "./dto/user-dto";
import Board from "./models/board";
import { BoardService } from "./services/board-service";
import { DBUtil } from "./utils/db-util";
class ServerManager {
  private app: Application;
  private port: number;
  private db: DBUtil;
  constructor(config: Config) {
    this.app = config.app;
    this.port = config.port;
    this.db = new DBUtil(config.db_uri);
    this.initMiddleware();
    config.routes.map((route: Route) => {
      this.app.use(route.url, route.module);
    });
  }
  private initMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  public async run() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export { ServerManager };
