import * as vscode from 'vscode';
import * as path from 'path';
import transformer from 'apim-policy-transformer';

export function activate(context: vscode.ExtensionContext) {
    let policyCombiner = vscode.commands.registerCommand('vsc-apim-policy-transformer.policyCombiner', async () => {
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
    context.subscriptions.push(policyExtractor);
    context.subscriptions.push(combinePolicyFromDirectory);
    context.subscriptions.push(extractPolicyFromDirectory);
}

// This method is called when your extension is deactivated
export function deactivate() {}