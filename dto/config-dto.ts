import { Application, Router } from "express";

interface Route {
  url: string;
  module: Router;
}
interface Config {
  app: Application;
  port: number;
  routes: Route[];
}
export { Config, Route };
