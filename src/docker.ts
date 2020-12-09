import { ExecType } from ".";
import { IBuildImage } from "./types";

export const dockerBuildImage = async (
  exec: ExecType,
  {
    buildOptions,
    appName,
    formation,
    dockerfileName,
    dockerfilePath,
  }: IBuildImage
) => {
  const dockerFile = dockerfilePath
    ? `${dockerfilePath}/${dockerfileName}`
    : dockerfileName;

  await exec(
    `docker build . --file ${dockerFile} ${buildOptions} --tag registry.heroku.com/${appName}/${formation}`
  );

  console.log("Image built 🛠");
};
