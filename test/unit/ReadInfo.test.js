"use strict";
/*global test, expect*/
/**
 * @file
 * ReadInfo.test.js
 */

const path = require("path");
const ReadInfo = require("../../classes/ReadInfo");

test(
  `[ReadInfo-001]
  Given
    - no filename
  When
    - ReadInfo is called
  Then
    - false is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = ReadInfo.read();

    // Then...
    expect(result).toEqual(false);
  }
);

test(
  `[ReadInfo-002]
  Given
    - a non-existent filename
  When
    - ReadInfo is called
  Then
    - false is returned
`.trim(),
  async () => {
    // Given...
    const filename = "/invalid/file/name/here";

    // When...
    const result = ReadInfo.read(filename);

    // Then...
    expect(result).toEqual(false);
  }
);

test(
  `[ReadInfo-003]
  Given
    - a valid, but empty, filename
  When
    - ReadInfo is called
  Then
    - an empty object is returned
`.trim(),
  async () => {
    // Given...
    const filename = path.join(__dirname, "../artifacts", "info-no-data.txt");

    // When...
    const result = ReadInfo.read(filename);

    // Then...
    expect(result).toEqual(false);
  }
);

test(
  `[ReadInfo-004]
  Given
    - a valid filename with a defined year key
  When
    - ReadInfo is called
  Then
    - an object is returned with key/value pairs
`.trim(),
  async () => {
    // Given...
    const filename = path.join(__dirname, "../artifacts", "info-year.txt");

    // When...
    const result = ReadInfo.read(filename);
    const expected = { year: "2021" };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ReadInfo-005]
  Given
    - a valid filename with a defined keys
  When
    - ReadInfo is called
  Then
    - an object is returned with key/value pairs
    - values have no leading/trailing spaces
`.trim(),
  async () => {
    // Given...
    const filename = path.join(
      __dirname,
      "../artifacts",
      "info-leading-trailing-spaces.txt"
    );

    // When...
    const result = ReadInfo.read(filename);

    // Then...
    expect(Object.keys(result).length).toBeGreaterThan(0);
    Object.keys(result).forEach((key) => {
      const trimmed = result[key].trim();
      expect(result[key]).toEqual(trimmed);
    });
  }
);
