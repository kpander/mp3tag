"use strict";
/**
 * @file
 * TagFiles.js
 */

const fs = require("fs");
const path = require("path");
const id3 = require("node-id3");

module.exports = class TagFiles {
  constructor() {}

  static read(file) {
    if (!file) return false;
    if (!fs.existsSync(file)) return false;

    return TagFiles._get_tags(file);
  }

  static _get_tags(file) {
    const raw = id3.read(file);

    let url = "";
    if (raw.userDefinedUrl && raw.userDefinedUrl.length > 0) {
      url = raw.userDefinedUrl[0].url;
    }
    let cover_art = false;
    if (raw.raw.APIC) {
      cover_art = raw.raw.APIC.imageBuffer;
    }

    return {
      artist: raw.artist || "",
      album: raw.album || "",
      year: raw.year || "",
      genre: raw.genre || "",
      track_number: raw.trackNumber || "",
      track_title: raw.title || "",
      url: url,
      cover_art: cover_art ? cover_art.toString() : false,
    };
  }

  static write(file, tags_raw) {
    if (!file) return false;
    if (!tags_raw) return false;

    const basename = path.basename(file, ".mp3");
    const matches = basename.match(/^[0-9]{1,}/);
    const track_number = matches ? matches[0] : "01";

    let url = [];
    if (tags_raw.url) {
      url = [{ url: tags_raw.url }];
    }

    const tags = {
      artist: tags_raw.artist || "",
      album: tags_raw.album || "",
      year: tags_raw.year || "",
      genre: tags_raw.genre || "",
      trackNumber: track_number,
      title: basename,
      userDefinedUrl: url,
      APIC: tags_raw.cover_art || "",
    };

    return id3.write(tags, file);
  }
};
