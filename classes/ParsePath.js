"use strict";
/**
 * @file
 * ParsePath.js
 */

const path = require("path");

module.exports = class ParsePath {
  constructor() {}

  static artistAlbumFromPath(pathname) {
    if (!pathname) return {};
    if (typeof pathname !== "string") return {};

    let basename = path.basename(pathname);

    let delim = "~";
    if (basename.indexOf("~") > -1) {
      // Path is in ARTIST ~ ALBUM format.
      delim = "~";
    } else if (basename.indexOf("-") > -1) {
      // Path is in ARTIST - ALBUM format.
      delim = "-";
    } else {
      // Assume path is in ARTIST/ALBUM format.
      const items = pathname.split(path.sep);
      if (items.length < 2) return {};

      basename = [items.pop(), items.pop()].reverse().join(delim);
    }

    const items = basename.split(delim);
    return {
      artist: items.shift().trim(),
      album: items.join(delim).trim(),
    };
  }
};
