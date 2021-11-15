"use strict";
/*global test, expect*/
/**
 * @file
 * help.test.js
 */

const TestUtil = require("../TestUtil");

test(
  `[help-001]
  Given
    - no path argument
  When
    - app is called
  Then
    - error message is shown
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
  `[help-002]
  Given
    - -h or --help arguments
  When
    - app is called
  Then
    - help info is shown
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const args1 = ["-h"];
    const args2 = ["--help"];

    // When...
    const result1 = TestUtil.exec(args1);
    const result2 = TestUtil.exec(args2);

    // Then...
    expect(result1.status).toEqual(0);
    expect(result1.stdout.toString().indexOf("Usage:")).toBeGreaterThan(-1);

    expect(result2.status).toEqual(0);
    expect(result2.stdout.toString().indexOf("Usage:")).toBeGreaterThan(-1);
  }
);

test(
  `[help-003]
  Given
    - -v or --version arguments
  When
    - app is called
  Then
    - version info is shown
    - exit code is 0
`.trim(),
  async () => {
    // Given...
    const args1 = ["-v"];
    const args2 = ["--version"];
    const name = require("../../package.json").name;

    // When...
    const result1 = TestUtil.exec(args1);
    const result2 = TestUtil.exec(args2);

    // Then...
    expect(result1.status).toEqual(0);
    expect(result1.stdout.toString().indexOf(name)).toBeGreaterThan(-1);

    expect(result2.status).toEqual(0);
    expect(result2.stdout.toString().indexOf(name)).toBeGreaterThan(-1);
  }
);
