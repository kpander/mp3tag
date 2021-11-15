"use strict";
/*global test, expect*/
/**
 * @file
 * TagFiles.test.js
 */

const fs = require("fs");
const path = require("path");
const tmp = require("tmp");

const TagFiles = require("../../util/TagFiles");

test(
  `[TagFiles-001]
  Given
    - no filename
  When
    - TagFiles.read() is called
  Then
    - boolean false is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = TagFiles.read();

    // Then...
    expect(result).toEqual(false);
  }
);

test(
  `[TagFiles-002]
  Given
    - non-existent filename
  When
    - TagFiles.read() is called
  Then
    - boolean false is returned
`.trim(),
  async () => {
    // Given...
    const file = "/path/to/invalid/file.mp3";

    // When...
    const result = TagFiles.read(file);

    // Then...
    expect(result).toEqual(false);
  }
);

test(
  `[TagFiles-003]
  Given
    - filename without tags
  When
    - TagFiles.read() is called
  Then
    - object with empty fields is returned
`.trim(),
  async () => {
    // Given...
    const file = path.join(__dirname, "../artifacts", "untagged.mp3");

    // When...
    const result = TagFiles.read(file);

    // Then...
    Object.keys(result).forEach((key) => {
      const expected = key === "cover_art" ? false : "";
      expect(result[key]).toEqual(expected);
    });
  }
);

test(
  `[TagFiles-004]
  Given
    - filename with tags
  When
    - TagFiles.read() is called
  Then
    - object with expected tags is returned
`.trim(),
  async () => {
    // Given...
    const file = path.join(__dirname, "../artifacts", "tagged.mp3");
    const expected = {
      artist: "Tag Artist",
      album: "My Best Tags",
      year: "2021",
      genre: "Rock",
      track_number: "01",
      track_title: "Tagged",
      url: "https://www.invisiblethreads.com",
      cover_art: false,
    };

    // When...
    const result = TagFiles.read(file);

    // Then...
    Object.keys(expected).forEach((key) => {
      expect(result[key]).toEqual(expected[key]);
    });
  }
);

test(
  `[TagFiles-005]
  Given
    - filename without tags
  When
    - TagFiles.write() is called
  Then
    - the tags are written to the file
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.fileSync();
    const file_src = path.join(__dirname, "../artifacts", "untagged.mp3");
    const file_dest = tmpobj.name;
    fs.copyFileSync(file_src, file_dest);

    const tags = {
      artist: "Test1 Tag Artist",
      album: "Test1 My Best Tags",
      year: "2021",
      genre: "Rock",
      url: "https://www.invisiblethreads.com/test1",
    };

    // When...
    const result = TagFiles.write(file_dest, tags);

    // Then...
    expect(result).toEqual(true);

    const tags_from_file = TagFiles.read(file_dest);

    Object.keys(tags).forEach((key) => {
      expect(tags_from_file[key]).toEqual(tags[key]);
    });
  }
);

test(
  `[TagFiles-006]
  Given
    - filename without tags
    - a cover art image
  When
    - TagFiles.write() is called
  Then
    - the tags are written to the file
    - the cover art image is written to the file
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.fileSync();
    const file_src = path.join(__dirname, "../artifacts", "untagged.mp3");
    const file_dest = tmpobj.name;
    fs.copyFileSync(file_src, file_dest);

    const file_cover = path.join(__dirname, "../artifacts", "cover.jpg");

    const tags = {
      artist: "Test1 Tag Artist",
      album: "Test1 My Best Tags",
      year: "2021",
      genre: "Rock",
      url: "https://www.invisiblethreads.com/test1",
      cover_art: file_cover,
    };

    // When...
    const result = TagFiles.write(file_dest, tags);

    // Then...
    expect(result).toEqual(true);
    const tags_from_file = TagFiles.read(file_dest);

    // Then... cover_art buffer should match file contents.
    const id3_cover_contents = tags_from_file.cover_art;
    const file_cover_contents = fs.readFileSync(file_cover).toString();
    expect(id3_cover_contents).toEqual(file_cover_contents);
    delete tags.cover_art;

    // Then... tags should match.
    Object.keys(tags).forEach((key) => {
      expect(tags_from_file[key]).toEqual(tags[key]);
    });
  }
);
