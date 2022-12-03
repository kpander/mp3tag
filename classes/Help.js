"use strict";
/**
 * @file
 * Help.js
 */

const package_json = require("../package.json");

module.exports = class Help {
  constructor() {}

  static version() {
    console.log(`${package_json.name} v${package_json.version}`);
  }

  static usage() {
    const bin = Object.keys(package_json.bin)[0];

    console.log(
      `
Usage: ${bin} path/to/process [options]

Add ID3 data from info.txt and rename mp3 files in the current folder.

Options:
  -l, --list      Show existing tags for files in the folder (don't add tags)
  --no-rename     Do not rename files during tagging
  -n, --dry-run   Show what would happen, but don't change any files
  -h, --help      Display this help page and exit
  -v, --version   Display version information and exit

Examples:

  Process files in the current path (assumes info.txt exists in current path)
    $ ${bin} .

  Dry-run files in the current path
    $ ${bin} . --dry-run

  Process files in child/folder/album
    $ ${bin} child/folder/album

  Process files in ~/music/band1
   $ ${bin} ~/music/band1

  Show existing tags for mp3 files in ~/music/my-band
   $ ${bin} ~/music/my-band --list

Format for info.txt file:

ARTIST=Artist name here
ALBUM=Album name here
YEAR=2023
GENRE=Rock
URL=https://www.allmusic.com/something

  `.trim()
    );
  }
};
