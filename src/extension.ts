// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import getConfig from "./config";
import { CancelObj } from "./model";
import runRetypeSelectedText from "./run-retype-selected-text";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("retype-selected-text is now active!");

  const cancelObj: CancelObj = {
    isCancelled: false,
  };

  let disposableRun = vscode.commands.registerCommand(
    "retype-selected-text.run",
    async () => {
      cancelObj.isCancelled = false;
      await runRetypeSelectedText(getConfig(), cancelObj);
    }
  );

  let disposableCancel = vscode.commands.registerCommand(
    "retype-selected-text.cancel",
    () => {
      cancelObj.isCancelled = true;
    }
  );

  context.subscriptions.push(disposableRun);
  context.subscriptions.push(disposableCancel);
}

// this method is called when your extension is deactivated
export function deactivate() {}
