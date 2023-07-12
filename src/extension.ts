import * as vscode from 'vscode';
import * as path from 'path';
import utils from 'apim-policy-utils';

export function activate(context: vscode.ExtensionContext) {
    let policyCombiner = vscode.commands.registerCommand('vsc-apim-policy-utils.policyCombiner', async () => {
        const uri = await vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: false,
            canSelectFolders: true,
        });
        let dir = uri?.[0].fsPath;
        if (dir) {
            // Combine the policies
            utils.combiner(dir);
            vscode.window.showInformationMessage(`Combine finished`);
        } else {
            vscode.window.showInformationMessage('Please select only one directory');
        }
    });

    let policyExtractor = vscode.commands.registerCommand('vsc-apim-policy-utils.policyExtractor', async () => {
        const uri = await vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: false,
            canSelectFolders: true,
        });
        let dir = uri?.[0].fsPath;
        if (dir) {
            utils.extractor(dir);
            vscode.window.showInformationMessage(`Extract finished`);
        } else {
            vscode.window.showInformationMessage('Please select only one directory');
        }
    });

    let combinePolicyFromDirectory = vscode.commands.registerCommand('vsc-apim-policy-utils.combineFromDirectory', async (uri) => {
        if (uri && uri.scheme === 'file' && uri.fsPath && !path.basename(uri.fsPath).includes('.')) {
            utils.combiner(uri.fsPath);
            vscode.window.showInformationMessage(`Combine finished`);
		  }
		  else {
            vscode.window.showInformationMessage('Having trouble locating the directory');
        }
    });

    let extractPolicyFromDirectory = vscode.commands.registerCommand('vsc-apim-policy-utils.extractFromDirectory', async (uri) => {
        if (uri && uri.scheme === 'file' && uri.fsPath && !path.basename(uri.fsPath).includes('.')) {
            utils.extractor(uri.fsPath);
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