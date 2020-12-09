export type Formation = "web" | "worker";

export interface IHerokuLogin {
  email: string;
  apiKey: string;
}

export interface IBuildImage {
  buildOptions: string;
  appName: string;
  formation: Formation;
  dockerfileName: string;
  dockerfilePath?: string;
}

export interface IRunHerokuAction {
  appName: string;
  apiKey: string;
  formation: Formation;
}
