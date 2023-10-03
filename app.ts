import express from "express";
import { ServerManager } from "./server-manager";
import { Route } from "./dto/config-dto";
import user from "./controllers/user-controller";
class App {
  private static routes: Route[];
  public static main(): void {
    this.routes = [
      {
        url: "/user",
        module: user,
      },
    ];

    const serverManager = new ServerManager({
      app: express(),
      port: 8080,
      routes: this.routes,
    });

    serverManager.run();
  }
}

App.main();
