"use strict";
/**
 * @file
 * Args.js
 */

const fs = require("fs");
const path = require("path");

module.exports = class Args {
  constructor() {}

  static args(argv) {
    const raw_args = require("minimist")(argv.slice(2));
    let raw_options = require("minimist")(argv.slice(2));

    const raw_commands = raw_args._;
    delete raw_options._;

    let args = {
      command: "",
      options: {
        path: false,
        isDryRun: false,
      },
    };

    if (raw_commands.length > 0) {
      args.command = "process";
      args.options.path = Args._expand_path(raw_commands[0]);
    }

    Object.keys(raw_options).forEach((key) => {
      switch (key) {
        case "help":
        case "h":
          args.command = "help";
          break;

        case "version":
        case "v":
          args.command = "version";
          break;

        case "dry-run":
        case "n":
          args.options.isDryRun = true;
          break;
      }
    });

    return args;
  }

  static _expand_path(raw_path) {
    if (!raw_path) return false;
    if (raw_path === ".") return process.cwd();

    if (!raw_path.match(/^\//)) {
      raw_path = path.join(process.cwd(), raw_path);
    }
    return raw_path;
  }

  static isValid(args) {
    if (args.command === "help") return true;
    if (args.command === "version") return true;

    if (args.command === "") {
      console.error(`Specify the path to process.`);
      return false;
    }

    if (!fs.existsSync(args.options.path)) {
      console.error(`Given path [${args.options.path}] doesn't exist.`);
      return false;
    }

    return true;
  }
};
