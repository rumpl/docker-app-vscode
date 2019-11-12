import * as vscode from 'vscode';
import { DockerAppImageProvider } from './app-image/DockerAppImageProvider';
import { DockerAppImage } from './app-image/DockerAppImage';
import { DockerAppImageLifecycle } from './app-image/DockerAppImageLifecycle';
import { Command } from './command/Command';

export function activate(_: vscode.ExtensionContext) {
	const lifecycle = new DockerAppImageLifecycle();
	const command = new Command();

	vscode.commands.registerCommand('dockerApp.runApp', (appImage: DockerAppImage) => lifecycle.install(appImage));
	vscode.window.registerTreeDataProvider('dockerApp', new DockerAppImageProvider(command));
}

export function deactivate() { }
