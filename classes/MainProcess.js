"use strict";
/**
 * @file
 * MainProcess.js
 */

const fs = require("fs");
const path = require("path");
const ParsePath = require("./ParsePath");
const ReadInfo = require("./ReadInfo");
const RenameFiles = require("./RenameFiles");
const TagFiles = require("../util/TagFiles");

module.exports = class MainProcess {
  constructor(config = {}) {
    this.path = config.path || false;
    this.isDryRun = config.isDryRun === true ? true : false;
    this.disableRename = config.disableRename === true ? true : false;
  }

  tag() {
    // Get mp3 files in folder.
    const files = this._get_files();
    if (!files.length) {
      return this._error("No mp3 files found in given path. Aborting.");
    }

    // Read info.txt to get metadata, and check for cover art.
    let metadata = {
      ...ReadInfo.read(path.join(this.path, "info.txt")),
      ...this._get_cover_art(),
    };
    if (Object.keys(metadata).length === 0) {
      return this._error("info.txt not found or has no valid data. Aborting.");
    } else {
      if (!metadata.artist || !metadata.album) {
        metadata = {
          ...metadata,
          ...ParsePath.artistAlbumFromPath(this.path),
        };
      }
      console.log("Using metadata:\n", metadata);
    }

    const renames = this._rename_files(files);
    const tag_errors = this._tag_files(renames, metadata);

    return tag_errors ? false : true;
  }

  _rename_files(files) {
    if (this.disableRename === true) {
      return this._array_to_pairs(files);
    }

    const renames = RenameFiles.renameFiles(files);
    Object.keys(renames).forEach((file_src) => {
      const name_src = path.basename(file_src);
      const name_dest = path.basename(renames[file_src]);
      if (this.isDryRun === true) {
        console.log(`'${name_src}' would be renamed to '${name_dest}'`);
      } else {
        console.log(`'${name_src}' renamed to '${name_dest}'`);
        fs.renameSync(file_src, renames[file_src]);
      }
    });

    return renames;
  }

  _array_to_pairs(arr) {
    const pairs = {};
    arr.forEach((item) => {
      pairs[item] = item;
    });
    return pairs;
  }

  list() {
    // Show existing tags for this folder. Use first file found.
    const files = this._get_files();
    if (!files.length) {
      return this._error("No mp3 files found in given path. Aborting.");
    }
    files.sort();

    const tags = TagFiles.read(files[0]);
    const excludes = ["track_number", "track_title", "cover_art"];
    this._list_tags(tags, excludes);
  }

  _list_tags(tags, excludes) {
    Object.keys(tags)
      .filter((key) => {
        return !excludes.includes(key);
      })
      .forEach((key) => {
        console.log(`${key.toUpperCase()}=${tags[key].toString().trim()}`);
      });
  }

  // @param object renames where
  //   key => source filename
  //   value => renamed filename
  _tag_files(renames, metadata) {
    let tag_errors = false;
    Object.keys(renames).forEach((file_src) => {
      const file = renames[file_src];

      if (!this.isDryRun === true) {
        console.log(`Tagging '${path.basename(file)}'`);
        if (!TagFiles.write(file, metadata)) {
          console.error(`Error tagging '${path.basename(file)}'. Aborting.`);
          tag_errors = true;
        }
      }
    });

    return tag_errors;
  }

  _error(message) {
    console.error(message);
    return false;
  }

  _get_files() {
    return fs
      .readdirSync(this.path)
      .filter((file) => {
        return file.match(/\.mp3$/i) ? true : false;
      })
      .map((file) => {
        return path.join(this.path, file);
      });
  }

  _get_cover_art() {
    const file = path.join(this.path, "cover.jpg");
    if (fs.existsSync(file)) return { cover_art: file };
    return {};
  }
};
