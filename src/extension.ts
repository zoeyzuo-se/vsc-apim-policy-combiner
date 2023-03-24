// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import {combiner} from './helper';

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
		const uris = await vscode.window.showOpenDialog({ canSelectMany: true });
		var resultLocation = <any>vscode.workspace.workspaceFolders?.[0].uri.fsPath || undefined;
        if (uris && uris.length === 2) {
            // Combine the policies
			vscode.window.showInformationMessage(`2 files selected: ${uris[0]}, ${uris[1]}`);
			var csPath = '';
			var xmlPath = '';
			if(uris[0].fsPath.endsWith('.cs') && uris[1].fsPath.endsWith('.xml')){
				csPath = uris[0].fsPath;
				xmlPath = uris[1].fsPath;
			} else if(uris[0].fsPath.endsWith('.xml') && uris[1].fsPath.endsWith('.cs')){
				csPath = uris[1].fsPath;
				xmlPath = uris[0].fsPath;
			} else {
				vscode.window.showInformationMessage('Please select one c# file and one xml file');
			}
			const combinedXmlString = await combiner(xmlPath, csPath);
			if (!resultLocation) {
				vscode.window.showInformationMessage('Please choose a location to store the combined file');
				const resultLocationUri = await vscode.window.showOpenDialog( {
					openLabel: 'Select location',
					canSelectFiles: false,
					canSelectFolders: true,
					canSelectMany: false,
				});
				resultLocation = resultLocationUri?.[0].fsPath;
			}
			if(!resultLocation) {
				vscode.window.showErrorMessage('Please select a location to store the result file');
			} else {
				let dateTime = new Date();
				const outputFileLoc = `${resultLocation}/result-${dateTime.toUTCString()}.xml`;
				fs.writeFileSync(outputFileLoc, combinedXmlString);
				const doc = await vscode.workspace.openTextDocument(outputFileLoc);
				await vscode.window.showTextDocument(doc, { preview: false });
			}     
        } else {
            vscode.window.showInformationMessage('Please select two files to combine.');
        }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
