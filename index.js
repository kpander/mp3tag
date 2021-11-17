#!/usr/bin/env node
"use strict";
/**
 * @file
 * index.js
 */

const Args = require("./classes/Args");
const Help = require("./classes/Help");
const MainProcess = require("./classes/MainProcess");
const package_json = require("./package.json");

const main = function (args) {
  if (!Args.isValid(args)) {
    console.error(
      `Missing or invalid arguments. Aborting. Try ${
        Object.keys(package_json.bin)[0]
      } --help`
    );
    process.exit(1);
  }

  const config = {
    path: args.options.path,
    isDryRun: args.options.isDryRun,
  };
  const mainProcess = new MainProcess(config);

  switch (args.command) {
    case "help":
      Help.usage();
      break;
    case "version":
      Help.version();
      break;
    case "process":
      if (!mainProcess.tag()) {
        process.exit(1);
      }
      break;
    case "list":
      mainProcess.list();
      break;
  }

  process.exit(0);
};

const args = Args.args(process.argv);
main(args);
