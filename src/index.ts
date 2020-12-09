import * as core from "@actions/core";
import childProcess from "child_process";
import { promisify } from "util";

import { getData } from "./data";
import { dockerBuildImage } from "./docker";
import { herokuLogin, herokuPush, herokuRelease } from "./heroku";

const exec = promisify(childProcess.exec);

export type ExecType = typeof exec;

const deployToHeroku = async () => {
  try {
    const {
      EMAIL,
      API_KEY,
      APP_NAME,
      DOCKERFILE_PATH,
      DOCKERFILE_NAME,
      OPTIONS,
      FORMATION,
    } = getData();

    await dockerBuildImage(exec, {
      buildOptions: OPTIONS,
      appName: APP_NAME,
      formation: FORMATION,
      dockerfileName: DOCKERFILE_NAME,
      dockerfilePath: DOCKERFILE_PATH,
    });

    await herokuLogin(exec, {
      email: EMAIL,
      apiKey: API_KEY,
    });

    await herokuPush(exec, {
      appName: APP_NAME,
      apiKey: API_KEY,
      formation: FORMATION,
    });

    await herokuRelease(exec, {
      appName: APP_NAME,
      apiKey: API_KEY,
      formation: FORMATION,
    });
  } catch (error) {
    console.error(error);

    core.setFailed(error.message);
  }
};

deployToHeroku();
