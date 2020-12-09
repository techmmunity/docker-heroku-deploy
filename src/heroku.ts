import { ExecType } from ".";
import { IHerokuLogin, IRunHerokuAction } from "./types";

export const herokuLogin = async (
  exec: ExecType,
  { email, apiKey }: IHerokuLogin
) => {
  await exec(
    `echo ${apiKey} | docker login --username=${email} registry.heroku.com --password-stdin`
  );

  console.log("Logged in succefully ✅");
};

export const herokuPush = async (
  exec: ExecType,
  { appName, apiKey, formation }: IRunHerokuAction
) => {
  await exec(
    `HEROKU_API_KEY=${apiKey} heroku container:push ${formation} --app ${appName}`
  );

  console.log("Container pushed to Heroku Container Registry ⏫");
};

export const herokuRelease = async (
  exec: ExecType,
  { appName, apiKey, formation }: IRunHerokuAction
) => {
  await exec(
    `HEROKU_API_KEY=${apiKey} heroku container:release ${formation} --app ${appName}`
  );

  console.log("App Deployed successfully 🚀");
};
