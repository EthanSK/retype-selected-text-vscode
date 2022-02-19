import * as vscode from "vscode";

export default function runRetypeSelectedText() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const selection = editor.selection;
  const selectedText = editor.document.getText(editor.selection);

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, "");
  });
}
