// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
const transformer = require('apim-policy-transformer');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "azure-apim-policy-combiner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('azure-apim-policy-combiner.policyCombiner', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const uri = await vscode.window.showOpenDialog({
			canSelectMany: false,
			canSelectFiles: false,
			canSelectFolders: true,
		});
		let policyDir = uri?.[0].fsPath;
        if (policyDir) {
            // Combine the policies
			vscode.window.showInformationMessage(`1 location selected: ${policyDir}`);
			transformer.extractor(policyDir);
        } else {
            vscode.window.showInformationMessage('Please select only one directory');
        }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}