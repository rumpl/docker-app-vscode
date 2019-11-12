import * as vscode from 'vscode';
import { DockerAppImageProvider } from './DockerAppImageProvider';
import { DockerAppImage } from './DockerAppImage';
import { DockerAppImageLifecycle } from './DockerAppImageLifecycle';

export function activate(_: vscode.ExtensionContext) {
	const lifecycle = new DockerAppImageLifecycle();
	vscode.commands.registerCommand('dockerApp.runApp', (appImage: DockerAppImage) => lifecycle.install(appImage));
	vscode.window.registerTreeDataProvider('dockerApp', new DockerAppImageProvider());
}

export function deactivate() { }
