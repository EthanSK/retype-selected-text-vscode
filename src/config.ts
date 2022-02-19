import { RetypeSelectedTextConfig } from "./model";
import * as vscode from "vscode";

const configBaseName = "retypeSelectedText";

const defaultSpeedCharsPerSec = 50;

export default function getConfig(): RetypeSelectedTextConfig {
  return {
    speed:
      vscode.workspace.getConfiguration(configBaseName).get("speed") ??
      defaultSpeedCharsPerSec,
  };
}
