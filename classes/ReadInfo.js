"use strict";
/**
 * @file
 * ReadInfo.js
 */

const fs = require("fs");

module.exports = class ReadInfo {
  constructor() {}

  static read(filename) {
    if (!filename) return false;
    if (!fs.existsSync(filename)) return false;

    const lines = fs
      .readFileSync(filename, "utf8")
      .split("\n")
      .map((line) => {
        return line.trim();
      });

    const metadata = ReadInfo._parse_keys(lines);
    return Object.keys(metadata).length === 0 ? false : metadata;
  }

  static get keys() {
    return [
      "url",
      "year",
      "genre",
      "review",
      "credits",
      "notes",
      "artist",
      "album",
    ];
  }

  static _parse_keys(lines) {
    const keys = ReadInfo.keys;
    let record = {};

    lines.forEach((line) => {
      const lower = line.toLowerCase();

      for (const key of keys) {
        const search = `${key}=`;
        if (lower.indexOf(search) === 0) {
          record[key] = line.substr(search.length).trim();
        }
      }
    });

    return record;
  }
};
