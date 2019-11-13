import { DockerAppImage } from './DockerAppImage';
import { ICommand } from '../command/Command';

interface Metadata {
  verstion: string;
  name: string;
}

interface AppImageInspect {
  Metadata: Metadata;
}

interface IDockerAppImageLifecycle {
  install(appImage: DockerAppImage): void;
}

export class DockerAppImageLifecycle implements IDockerAppImageLifecycle {
  private command: ICommand;

  constructor(command: ICommand) {
    this.command = command;
  }

  public async install(appImage: DockerAppImage) {
    const out = await this.command.execute(`docker app image inspect ${appImage.id}`);
    const inspect = JSON.parse(out) as AppImageInspect;

    this.command.execute(`docker app run ${appImage.id} --name ${inspect.Metadata.name}`);
  }

  public rm(appImage: DockerAppImage) {
    return this.command.execute(`docker app image rm ${appImage.id}`);
  }
}
