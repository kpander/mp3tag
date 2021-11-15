"use strict";
/**
 * @file
 * RenameFiles.js
 */

const path = require("path");

const CommonSubstring = require("../util/CommonSubstring");

module.exports = class RenameFiles {
  constructor() {}

  // Given an array of absolute filename, return a map of key/value pairs,
  // where map is the original filename, value is the renamed file.
  //
  // No actual renaming of physical files takes place.
  static renameFiles(files) {
    if (!files) return {};
    if (!files.length) return {};

    const common = RenameFiles._get_common_strings(files);

    let results = {};

    files.forEach((file, index) => {
      const ext = file.split(".").pop();
      let basename = path.basename(file, `.${ext}`);

      basename = RenameFiles._replace_common_strings(basename, common);
      basename = RenameFiles._clean(basename);
      basename = RenameFiles._number(basename, index + 1);
      basename = RenameFiles._ucwords(basename.toLocaleLowerCase());
      basename = basename.replaceAll(" ", "_"); // Spaces to underscores

      const renamed = path.join(path.dirname(file), `${basename}.${ext}`);

      results[file] = renamed;
    });

    return results;
  }

  static _clean(file) {
    return file
      .trim()
      .replaceAll("_", " ") // Underscores to Spaces
      .trim()
      .replaceAll("[", "(") // Brackets to parentheses
      .replaceAll("]", ")") // Brackets to parentheses
      .replace(/[\s-]{1,}$/, "") // Remove trailing underscores/dashes
      .replace(/^[\s-]{1,}/, "") // Remove leading underscores/dashes
      .replace(/\s+/g, " ") // Multiple spaces to single space
      .replace(/^([0-9]{1,})[.-\s]{1,}/, "$1 ") // Fix numbers like "05.name"
      .trim();
  }

  static _number(file, index) {
    const zero_pad = (num, places) => String(num).padStart(places, "0");

    if (!file.match(/^[0-9]{2,}[\s-_]/)) {
      file = file.replace(/^[0-9]{1,}\s/, ""); // Remove file number
      return `${zero_pad(index, 2)} ${file}`;
    } else {
      return file;
    }
  }

  // Uppercase each word. Assume a words are delimited by spaces.
  // Account for words inside parentheses.
  // https://gist.github.com/rickycheers/4541395
  static _ucwords(str) {
    str = str.replace(/([()])/g, "$1 "); // Tmp transform for parentheses
    str = (" " + str).replace(/ [\w]/g, (a) => a.toLocaleUpperCase()).trim();
    str = str.replace(/([()]) /g, "$1"); // Restore tmp transform
    return str;
  }

  static _get_common_strings(files) {
    if (files.length < 2) return {};

    const basenames = files.map((file) => {
      return path.basename(file, ".mp3");
    });

    return {
      prefix: CommonSubstring.longestPrefix(basenames),
      suffix: CommonSubstring.longestSuffix(basenames),
    };
  }

  static _replace_common_strings(str, common) {
    Object.keys(common).forEach((key) => {
      if (common[key] !== "") str = str.replace(common[key], "");
    });

    return str;
  }
};
