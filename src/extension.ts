// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
const path = require('path');
const transformer = require('apim-policy-transformer');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-apim-policy-transformer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let policyCombiner = vscode.commands.registerCommand('vsc-apim-policy-transformer.policyCombiner', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const uri = await vscode.window.showOpenDialog({
			canSelectMany: false,
			canSelectFiles: false,
			canSelectFolders: true,
		});
		let dir = uri?.[0].fsPath;
        if (dir) {
            // Combine the policies
			transformer.combiner(dir);
			vscode.window.showInformationMessage(`Combine finished`);
        } else {
            vscode.window.showInformationMessage('Please select only one directory');
        }
	});

	let policyExtractor = vscode.commands.registerCommand('vsc-apim-policy-transformer.policyExtractor', async () => {
		const uri = await vscode.window.showOpenDialog({
			canSelectMany: false,
			canSelectFiles: false,
			canSelectFolders: true,
		});
		let dir = uri?.[0].fsPath;
        if (dir) {
            // Extract the policies
			transformer.extractor(dir);
			vscode.window.showInformationMessage(`Extract finished`);
        } else {
            vscode.window.showInformationMessage('Please select only one directory');
        }
	});

	let combinePolicyFromDirectory = vscode.commands.registerCommand('vsc-apim-policy-transformer.combineFromDirectory', async (uri) => {
		if (uri && uri.scheme === 'file' && uri.fsPath && !path.basename(uri.fsPath).includes('.')) {
			transformer.combiner(uri.fsPath);
			vscode.window.showInformationMessage(`Combine finished`);
		  }
		  else {
            vscode.window.showInformationMessage('Having trouble locating the directory');
        }
	});

	let extractPolicyFromDirectory = vscode.commands.registerCommand('vsc-apim-policy-transformer.extractFromDirectory', async (uri) => {
		if (uri && uri.scheme === 'file' && uri.fsPath && !path.basename(uri.fsPath).includes('.')) {
			transformer.extractor(uri.fsPath);
			vscode.window.showInformationMessage(`Extract finished`);
		  } else {
			vscode.window.showInformationMessage('Having trouble locating the directory');
		  }
	});

	context.subscriptions.push(policyCombiner);
}

// This method is called when your extension is deactivated
export function deactivate() {}