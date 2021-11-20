"use strict";
/**
 * @file
 * RenameFiles.js
 */

const path = require("path");

const CommonSubstring = require("../util/CommonSubstring");

// Support earlier versions of node.
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    return this.split("str").join(newStr);
  };
}

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
      basename = RenameFiles._number(basename, index + 1, file);
      basename = RenameFiles._ucwords(basename);
      basename = basename.replaceAll("-", "_"); // Hyphens to underscores
      basename = basename.replaceAll(" ", "_"); // Spaces to underscores

      const renamed = path.join(path.dirname(file), `${basename}.${ext}`);

      results[file] = renamed;
    });

    return results;
  }

  static _clean(file) {
    return file
      .replace(/^[\s-_]{1,}/, "") // Remove leading spaces/underscores/dashes
      .replace(/^[0-9]{1,}/, "") // Remove leading numbers
      .replace(/^\.{1,}/, "") // Remove leading period
      .replaceAll("_", " ") // Underscores to Spaces
      .trim()
      .replaceAll("[", "(") // Brackets to parentheses
      .replaceAll("]", ")") // Brackets to parentheses
      .replace(/[\.]{1,}$/, "") // Remove trailing periods
      .replace(/[\s-]{1,}$/, "") // Remove trailing underscores/dashes
      .replace(/^[\s-]{1,}/, "") // Remove leading underscores/dashes
      .replace(/\s+/g, " ") // Multiple spaces to single space
      .replace(/[\.]{1,}/g, ".") // Multiple periods to single period
      .replace(/\.{1,}$/, "") // Remove trailing period
      .trim();
  }

  static _number(file, index, original_file) {
    const zero_pad = (num, places) => String(num).padStart(places, "0");

    const match = path.basename(original_file).match(/^([0-9]{1,})/);
    let size = match ? match[0].length : 2;

    if (size < 3) {
      return `${zero_pad(index, 2)} ${file}`;
    } else {
      return `${match[0]} ${file}`;
    }
  }

  // Uppercase each word. Assume a words are delimited by spaces.
  // Account for words inside parentheses.
  // https://gist.github.com/rickycheers/4541395
  static _ucwords(str) {
    // Characters after a period should be uppercase.
    str = str.replace(/\./g, " . ");
    str = (" " + str).replace(/ [\w]/g, (a) => a.toLocaleUpperCase()).trim();
    str = str.replace(/ \. /g, ".");

    // Characters starting after a parenthesis should be uppercase.
    str = str.replace(/([()])/g, "$1 ");
    str = (" " + str).replace(/ [\w]/g, (a) => a.toLocaleUpperCase()).trim();
    str = str.replace(/([()]) /g, "$1");

    return str;
  }

  static _get_common_strings(files) {
    if (files.length < 2) return {};

    const basenames = files.map((file) => {
      const basename = path.basename(file, ".mp3");
      return basename.replace(/^[0-9]{1,}/, ""); // Remove leading numbers
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
