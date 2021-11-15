"use strict";
/*global test, expect*/
/**
 * @file
 * process.test.js
 */

// @todo test current path, '.' as arg, test expansion
// @todo should we pass '~/' as arg? b/c shell does expansion, not us

const fs = require("fs");
const path = require("path");
const tmp = require("tmp");

const TestUtil = require("../TestUtil");
const TagFiles = require("../../util/TagFiles");

test(
  `[process-001]
  Given
    - invalid path argument
  When
    - app is called
  Then
    - error message is shown
    - exit code is 1
`.trim(),
  async () => {
    // Given...
    const args = ["/invalid/path/to/files"];

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(1);
    expect(result.stderr.toString().length).toBeGreaterThan(0);
  }
);

test(
  `[process-002]
  Given
    - valid path, that contains no mp3 files
  When
    - app is called
  Then
    - error message is shown
    - exit code is 1
`.trim(),
  async () => {
    // Given...
    const args = [__dirname];

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(1);
    expect(result.stderr.toString().length).toBeGreaterThan(0);
  }
);

test(
  `[process-003]
  Given
    - valid path, with mp3 files
    - doesn't contain 'info.txt' file
  When
    - app is called
  Then
    - error message is shown
    - exit code is 1
`.trim(),
  async () => {
    // Given...
    const args = [path.join(__dirname, "../artifacts/mp3-no-info")];

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(1);
    expect(result.stderr.toString().length).toBeGreaterThan(0);
  }
);

test(
  `[process-004]
  Given
    - valid path, with mp3 files, with 'info.txt' file
  When
    - app is called
  Then
    - files should be renamed
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;

    const file1 = TestUtil.getRefFile1(path_tmp);
    const file2 = TestUtil.getRefFile2(path_tmp);
    TestUtil.copyRefFiles([file1, file2]);
    TestUtil.createInfoTxt(path_tmp);

    const args = [path_tmp];

    // When...
    const result = TestUtil.exec(args);

    // Then... exit without error
    expect(result.status).toEqual(0);
    expect(result.stderr.toString().length).toEqual(0);

    // Then... files should have been renamed
    [file1, file2].forEach((file) => {
      expect(fs.existsSync(file.dest)).toEqual(false);
      expect(fs.existsSync(file.renamed)).toEqual(true);
    });
  }
);

test(
  `[process-005]
  Given
    - valid path, with mp3 files, with 'info.txt' file
  When
    - app is called
    - with --dry-run argument
  Then
    - files should not be renamed
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;

    const file1 = TestUtil.getRefFile1(path_tmp);
    const file2 = TestUtil.getRefFile2(path_tmp);
    TestUtil.copyRefFiles([file1, file2]);
    TestUtil.createInfoTxt(path_tmp);

    const args = [path_tmp, "--dry-run"];

    // When...
    const result = TestUtil.exec(args);

    // Then... exit without error
    expect(result.status).toEqual(0);
    expect(result.stderr.toString().length).toEqual(0);

    // Then... files should not have been renamed
    [file1, file2].forEach((file) => {
      expect(fs.existsSync(file.dest)).toEqual(true);
      expect(fs.existsSync(file.renamed)).toEqual(false);
    });
  }
);

test(
  `[process-006]
  Given
    - valid path, with mp3 files, with 'info.txt' file
  When
    - app is called
  Then
    - files should be tagged
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;

    const file1 = TestUtil.getRefFile1(path_tmp);
    const file2 = TestUtil.getRefFile2(path_tmp);
    TestUtil.copyRefFiles([file1, file2]);
    const metadata = TestUtil.createInfoTxt(path_tmp);

    const args = [path_tmp];

    // When...
    const result = TestUtil.exec(args);

    // Then... exit without error
    expect(result.status).toEqual(0);
    expect(result.stderr.toString().length).toEqual(0);

    // Then... files should have been tagged
    [file1, file2].forEach((file) => {
      const file_metadata = TagFiles.read(file.renamed);
      ["artist", "album", "year", "url", "genre"].forEach((key) => {
        expect(file_metadata[key]).toEqual(metadata[key]);

        ["track_number", "track_title"].forEach((track_key) => {
          expect(file_metadata[track_key]).toEqual(file[track_key]);
        });
        expect(file_metadata.cover_art).toEqual(false);
      });
    });
  }
);

test(
  `[process-007]
  Given
    - valid path, with mp3 files, with 'info.txt' file
  When
    - app is called
    - with --dry-run argument
  Then
    - files should be not tagged
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;

    const file1 = TestUtil.getRefFile1(path_tmp);
    const file2 = TestUtil.getRefFile2(path_tmp);
    TestUtil.copyRefFiles([file1, file2]);
    const metadata = TestUtil.createInfoTxt(path_tmp);

    const args = [path_tmp, "--dry-run"];

    // When...
    const result = TestUtil.exec(args);

    // Then... exit without error
    expect(result.status).toEqual(0);
    expect(result.stderr.toString().length).toEqual(0);

    // Then... files should not be tagged
    [file1, file2].forEach((file) => {
      const file_metadata = TagFiles.read(file.renamed);
      ["artist", "album", "year", "url", "genre"].forEach((key) => {
        expect(file_metadata[key]).not.toEqual(metadata[key]);

        ["track_title"].forEach((track_key) => {
          expect(file_metadata[track_key]).not.toEqual(file[track_key]);
        });
      });
    });
  }
);
