"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/input.utils.ts
var input_utils_exports = {};
__export(input_utils_exports, {
  waitForKeyPress: () => waitForKeyPress,
  waitForUserInput: () => waitForUserInput
});
module.exports = __toCommonJS(input_utils_exports);
var readline = __toESM(require("readline"));
var waitForUserInput = (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(
    (resolve) => rl.question(question ? `>> ${question}: ` : ">> ", (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};
var waitForKeyPress = (question) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  return new Promise((resolve) => {
    const listener = (_key, data) => {
      process.stdin.setRawMode(false);
      process.stdin.off("keypress", listener);
      process.stdin.pause();
      resolve(data);
    };
    process.stdout.write(question ? `>> ${question}: ` : ">> ");
    process.stdin.resume();
    process.stdin.on("keypress", listener);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  waitForKeyPress,
  waitForUserInput
});
//# sourceMappingURL=input.utils.js.map