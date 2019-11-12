import * as cp from 'child_process';
import { resolve } from 'dns';

export interface ICommand {
  execute(command: string): Promise<string>;
}

export class Command implements ICommand {
  execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cp.exec(command, (err: cp.ExecException | null, stdout: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}
