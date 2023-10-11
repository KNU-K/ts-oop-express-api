import { Application, Router } from "express";

interface Route {
  url: string;
  module: Router;
}
interface Config {
  app: Application;
  port: number;
  db_uri: string;
  routes: Route[];
}
export { Config, Route };
