import * as vscode from 'vscode';
import { DockerAppImageProvider } from './app-image/DockerAppImageProvider';
import { DockerAppImage } from './app-image/DockerAppImage';
import { DockerAppImageLifecycle } from './app-image/DockerAppImageLifecycle';
import { Command } from './command/Command';

export function activate(_: vscode.ExtensionContext) {
	const command = new Command();

	const lifecycle = new DockerAppImageLifecycle(command);
	const dataProvider = new DockerAppImageProvider(command);
	vscode.commands.registerCommand('dockerApp.runApp', (appImage: DockerAppImage) => lifecycle.install(appImage));
	vscode.commands.registerCommand('dockerApp.rmApp', async (appImage: DockerAppImage) => {
		await lifecycle.rm(appImage);
		dataProvider.refresh();
	});
	vscode.window.registerTreeDataProvider('dockerApp', dataProvider);
}

export function deactivate() { }
