import express, { Application } from "express";
import { Config, Route } from "./dto/config-dto";
import mongoose from "mongoose";
import MongoDBClient from "./utils/db";
class ServerManager {
  private app: Application;
  private port: number;
  private conn: MongoDBClient;
  constructor(config: Config) {
    this.app = config.app;
    this.port = config.port;
    this.conn = new MongoDBClient();
    this.initMiddleware();
    this.testDatabase();
    config.routes.map((route: Route) => {
      this.app.use(route.url, route.module);
    });
  }
  private testDatabase() {
    this.conn.connect();
  }
  private initMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  public run(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export { ServerManager };
