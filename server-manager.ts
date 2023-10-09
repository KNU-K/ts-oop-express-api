import express, { Application } from "express";
import { Config, Route } from "./dto/config-dto";
import mongoose, { ConnectOptions, connect } from "mongoose";
import User from "./models/user";
import { UserService } from "./services/user-service";
import { UserDto } from "./dto/user-dto";
class ServerManager {
  private app: Application;
  private port: number;
  constructor(config: Config) {
    this.app = config.app;
    this.port = config.port;
    this.initMiddleware();
    this.initDatabase();
    config.routes.map((route: Route) => {
      this.app.use(route.url, route.module);
    });
  }
  private async initDatabase() {
    await connect("mongodb+srv://root:root@cluster0.oxoj0ip.mongodb.net/test");

    const findUsers: UserDto[] = (await User.find()).map((user) => ({
      userId: user.userId,
      userPw: user.userPw,
      userName: user.userName,
    }));
    console.log(findUsers);
    UserService.initUser(findUsers);

    console.log("user table loading succeed");
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
