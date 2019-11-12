import * as path from 'path';
import * as vscode from 'vscode';
import { throws } from 'assert';

export class DockerAppImage extends vscode.TreeItem {
  contextValue = 'dockerAppImage';

  constructor(name: string) {
    super(name, vscode.TreeItemCollapsibleState.None);
    this.id = name;
    this.iconPath = path.join(__filename, '..', '..', 'media', 'docker.svg');
  }
}
