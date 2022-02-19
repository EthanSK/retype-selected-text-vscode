import * as vscode from "vscode";
import { CancelObj, RetypeSelectedTextConfig } from "./model";
import { delay } from "./utils";

export default async function runRetypeSelectedText(
  config: RetypeSelectedTextConfig,
  cancelObj: CancelObj
) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const selection = editor.selection;
  const selectedText = editor.document.getText(editor.selection);

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, "");
  });

  const delayBetweenEachCharMs = 1000 * (1 / config.speed);

  for (let i = 0; i < selectedText.length; i++) {
    await delay(delayBetweenEachCharMs);
    if (cancelObj.isCancelled) {
      break;
    }

    const char = selectedText.charAt(i);

    editor.edit((editBuilder) => {
      editBuilder.insert(selection.end, char);
    });
  }
}
