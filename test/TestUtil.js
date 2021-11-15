"use strict";

const fs = require("fs");
const path = require("path");
const tmp = require("tmp");

const { spawnSync } = require("child_process");

module.exports = class TestUtil {
  static exec(args = []) {
    const result = spawnSync("node index.js", args, {
      shell: true,
      cwd: path.join(__dirname, "../"),
    });

    return result;
  }

  static get tmpPath() {
    const config = { unsafeCleanup: true };
    return tmp.dirSync(config);
  }

  static getRefFile1(path_tmp) {
    return {
      src: path.join(__dirname, "artifacts/tagged.mp3"),
      dest: path.join(path_tmp, "01 first track.mp3"),
      renamed: path.join(path_tmp, "01_First_Track.mp3"),
      track_number: "01",
      track_title: "01_First_Track",
    };
  }

  static getRefFile2(path_tmp) {
    return {
      src: path.join(__dirname, "artifacts/untagged.mp3"),
      dest: path.join(path_tmp, "02 second file.mp3"),
      renamed: path.join(path_tmp, "02_Second_File.mp3"),
      track_number: "02",
      track_title: "02_Second_File",
    };
  }

  static copyRefFiles(files) {
    files.forEach((file) => {
      fs.copyFileSync(file.src, file.dest);
    });
  }

  // Copy our placeholder info.txt file to a destination path.
  static copyInfoTxt(path_dest) {
    const file_src = path.join(__dirname, "artifacts/info.txt");
    const file_dest = path.join(path_dest, "info.txt");
    fs.copyFileSync(file_src, file_dest);
  }

  // Write reference info.txt content for testing tagging.
  static createInfoTxt(path_dest) {
    const file = path.join(path_dest, "info.txt");

    const metadata = {
      artist: "Artist Name",
      album: "Album Name",
      year: "2011",
      url: "https://customurl.com/my/path",
      genre: "Fusion",
    };

    const info = `
ARTIST=${metadata.artist}
ALBUM=${metadata.album}
YEAR=${metadata.year}
URL=${metadata.url}
GENRE=${metadata.genre}
`.trim();

    fs.writeFileSync(file, info, "utf8");
    return metadata;
  }
};
