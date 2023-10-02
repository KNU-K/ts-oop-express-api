import { Application } from "express";
import { Config, Route } from "./dto/config-dto";
class ServerManager {
  private app: Application;
  private port: number;

  constructor(config: Config) {
    this.app = config.app;
    this.port = config.port;
    config.routes.map((route: Route) => {
      this.app.use(route.url, route.module);
    });
  }
  public run(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export { ServerManager };
