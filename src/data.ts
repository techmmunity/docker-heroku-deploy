import * as core from "@actions/core";

import { API_KEY_REGEX, EMAIL_REGEX } from "./regex";
import { Formation } from "./types";

const getDockerFilePath = () =>
  core.getInput("dockerfile_name") || "Dockerfile";

const getOptions = () => core.getInput("options") || "";

const getFormation = () => (core.getInput("formation") || "web") as Formation;

const not = (value: any) => !value;

const notValidEmail = (email: string) =>
  not(email) || not(EMAIL_REGEX.test(email));

const notValidApiKey = (apiKey: string) =>
  not(apiKey) || not(API_KEY_REGEX.test(apiKey));

const notValidAppName = (appName: string) => not(appName);

const notValidFormation = (formation: string) =>
  not(["web", "worker"].includes(formation));

export const getData = () => {
  const EMAIL = core.getInput("email");
  const API_KEY = core.getInput("api_key");
  const APP_NAME = core.getInput("app_name");
  const DOCKERFILE_PATH = core.getInput("dockerfile_path");
  const DOCKERFILE_NAME = getDockerFilePath();
  const OPTIONS = getOptions();
  const FORMATION = getFormation();

  switch (true) {
    case notValidEmail(EMAIL):
      throw new Error("Invalid Email");
    case notValidApiKey(API_KEY):
      throw new Error("Invalid Api Key");
    case notValidAppName(APP_NAME):
      throw new Error("Invalid Api Name");
    case notValidFormation(FORMATION):
      throw new Error(
        `Invalid formation: "${FORMATION}". The formation must be "web" or "worker"`
      );
  }

  return {
    EMAIL,
    API_KEY,
    APP_NAME,
    DOCKERFILE_PATH,
    DOCKERFILE_NAME,
    OPTIONS,
    FORMATION,
  };
};
