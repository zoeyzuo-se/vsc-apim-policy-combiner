// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {combiner} from './helper';
const fs = require('fs');

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
        if (uris && uris.length === 2) {
            // Combine the policies
			vscode.window.showInformationMessage(`2 files selected: ${uris[0]}, ${uris[1]}`);
			var csPath = '';
			var xmlPath = '';
			if(uris[0].path.endsWith('.cs') && uris[1].path.endsWith('.xml')){
				csPath = uris[0].path;
				xmlPath = uris[1].path;
			} else if(uris[0].path.endsWith('.xml') && uris[1].path.endsWith('.cs')){
				csPath = uris[1].path;
				xmlPath = uris[0].path;
			} else {
				vscode.window.showInformationMessage('Please select one c# file and one xml file');
			}
			const combinedXmlString = await combiner(xmlPath, csPath);
			const outputFileLoc = "/Users/zoeyzuo/Documents/work/LSEG/extension-dev/azure-apim-policy-combiner/result.xml";
			fs.writeFileSync(outputFileLoc, combinedXmlString);
            const doc = await vscode.workspace.openTextDocument(outputFileLoc);
            await vscode.window.showTextDocument(doc, { preview: false });

        } else {
            vscode.window.showInformationMessage('Please select two files to combine.');
        }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
