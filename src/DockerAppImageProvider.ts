import * as vscode from 'vscode';
import { DockerAppImage } from "./DockerAppImage";
import * as cp from 'child_process';

export class DockerAppImageProvider implements vscode.TreeDataProvider<DockerAppImage> {
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

  private getApps(): Thenable<DockerAppImage[]> {
    return new Promise((resolve, reject) => {
      cp.exec('docker app image ls', (err: cp.ExecException | null, stdout: string) => {
        if (err) {
          reject(err);
        } else {
          const lines = stdout.split('\n');
          // The first line is the header.
          lines.shift();
          lines.pop();

          const apps = lines.map((line: string) => {
            const parts = line.split(/\s+/);
            if (parts[1] !== '<none>') {
              return new DockerAppImage(`${parts[0]}:${parts[1]}`);
            } else {
              return new DockerAppImage(parts[2]);
            }
          });

          resolve(apps);
        }
      });
    });
  }
}
