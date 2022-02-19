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
  let selectedText = editor.document.getText(editor.selection);

  selectedText = selectedText.replace(/\r\n/g, "\n"); //otherwise it does 2 new lines for crlf line endings

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, "");
  });

  const delayBetweenEachCharMs = 1000 * (1 / config.speed);

  for (let i = 0; i < selectedText.length; i++) {
    await delay(delayBetweenEachCharMs);
    if (cancelObj.isCancelled) {
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, selectedText);
      });
      break;
    }

    const char = selectedText.charAt(i);

    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, char);
    });
  }
}
