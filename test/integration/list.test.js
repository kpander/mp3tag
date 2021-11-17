"use strict";
/*global test, expect*/
/**
 * @file
 * list.test.js
 */

const tmp = require("tmp");

const TestUtil = require("../TestUtil");

test(
  `[list-001]
  Given
    - no path
  When
    - app is called with --list
  Then
    - error message is displayed
    - exit code is 1
`.trim(),
  async () => {
    // Given...
    const args = [];

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(1);
    expect(result.stderr.toString().length).toBeGreaterThan(0);
  }
);

test(
  `[list-002]
  Given
    - non-existent path
  When
    - app is called with --list
  Then
    - error message is displayed
    - exit code is 1
`.trim(),
  async () => {
    // Given...
    const args = ["/path/to/nothing"];

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(1);
    expect(result.stderr.toString().length).toBeGreaterThan(0);
  }
);

test(
  `[list-003]
  Given
    - valid path, but no mp3 files in it
  When
    - app is called with --list
  Then
    - error message is displayed
    - exit code is 1
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;
    const args = [path_tmp];

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(1);
    expect(result.stderr.toString().length).toBeGreaterThan(0);
  }
);

test(
  `[list-004]
  Given
    - valid path, with mp3 files without tags
  When
    - app is called with --list
  Then
    - existing tag info is displayed, and all tags are empty
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;

    const file2 = TestUtil.getRefFile2(path_tmp); // untagged file
    TestUtil.copyRefFiles([file2]);

    const args = [path_tmp, "--list"];
    const expected = `
ARTIST=
ALBUM=
YEAR=
GENRE=
URL=
`.trim();

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(0);
    expect(result.stdout.toString().trim()).toEqual(expected);
  }
);

test(
  `[list-005]
  Given
    - valid path, with mp3 files with tags
  When
    - app is called with --list
  Then
    - existing tag info is displayed
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const tmpobj = tmp.dirSync();
    const path_tmp = tmpobj.name;

    const file1 = TestUtil.getRefFile1(path_tmp); // known tagged file
    TestUtil.copyRefFiles([file1]);

    const args = [path_tmp, "--list"];
    const expected = `
ARTIST=Tag Artist
ALBUM=My Best Tags
YEAR=2021
GENRE=Rock
URL=https://www.invisiblethreads.com
`.trim();

    // When...
    const result = TestUtil.exec(args);

    // Then...
    expect(result.status).toEqual(0);
    expect(result.stdout.toString().trim()).toEqual(expected);
  }
);
