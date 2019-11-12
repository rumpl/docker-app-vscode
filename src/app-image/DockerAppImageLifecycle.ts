import { DockerAppImage } from './DockerAppImage';

interface IDockerAppImageLifecycle {
  install(appImage: DockerAppImage): void;
}

export class DockerAppImageLifecycle implements IDockerAppImageLifecycle {
  public install(appImage: DockerAppImage) {
    // TODO: implement this
    console.log(`installing ${appImage.label}`);
  }
}
