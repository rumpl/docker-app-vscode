import * as vscode from 'vscode';
import { DockerAppImage } from "./DockerAppImage";
import * as cp from 'child_process';
import { ICommand } from '../command/Command';

export class DockerAppImageProvider implements vscode.TreeDataProvider<DockerAppImage> {
  private command: ICommand;

  constructor(command: ICommand) {
    this.command = command;
  }

  onDidChangeTreeData?: vscode.Event<DockerAppImage | null | undefined> | undefined;

  getTreeItem(element: DockerAppImage): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: DockerAppImage | undefined): vscode.ProviderResult<DockerAppImage[]> {
    if (!element) {
      return this.getApps();
    }
    return null;
  }

  private async getApps(): Promise<DockerAppImage[]> {
    const stdout = await this.command.execute('docker app image ls');
    const lines = stdout.split('\n');
    // The first line is the header.
    lines.shift();
    // The last line is empty
    lines.pop();

    return lines.map((line: string) => {
      const parts = line.split(/\s+/);
      if (parts[1] !== '<none>') {
        return new DockerAppImage(`${parts[0]}:${parts[1]}`);
      } else {
        return new DockerAppImage(parts[2]);
      }
    });
  }
}
