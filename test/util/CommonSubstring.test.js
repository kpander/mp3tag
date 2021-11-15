"use strict";
/*global test, expect*/
/**
 * @file
 * CommonSubstring.test.js
 */

const CommonSubstring = require("../../util/CommonSubstring");

test(
  `[CommonSubstring-001]
  Given
    - no array is given
  When
    - longestSubstring is called
  Then
    - empty string is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = CommonSubstring.longestSubstring();

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-002]
  Given
    - an empty array is given
  When
    - longestSubstring is called
  Then
    - empty string is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = CommonSubstring.longestSubstring([]);

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-003]
  Given
    - an array of 2 identical strings is given
  When
    - longestSubstring is called
  Then
    - the full common string is returned
`.trim(),
  async () => {
    // Given...
    const array = ["full string one", "full string one"];

    // When...
    const result = CommonSubstring.longestSubstring(array);

    // Then...
    expect(result).toEqual(array[0]);
  }
);

test(
  `[CommonSubstring-004]
  Given
    - an array of strings is given
  When
    - longestSubstring is called
  Then
    - the longest common string is returned
`.trim(),
  async () => {
    // Given...
    const array = [
      "longestmatch full string one",
      "full string one longestmatch",
      "something longestmatch is here in another",
      "a longestmatch small",
    ];

    // When...
    const result = CommonSubstring.longestSubstring(array);

    // Then...
    expect(result).toEqual("longestmatch");
  }
);

test(
  `[CommonSubstring-005]
  Given
    - no array is given
  When
    - longestPrefix is called
  Then
    - an empty string is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = CommonSubstring.longestPrefix();

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-006]
  Given
    - an empty array is given
  When
    - longestPrefix is called
  Then
    - an empty string is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = CommonSubstring.longestPrefix([]);

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-007]
  Given
    - an array of strings is given
  When
    - longestPrefix is called
  Then
    - the longest common starting string is returned
`.trim(),
  async () => {
    // Given...
    const array = [
      "longestmatch full string one",
      "longer full string one longestmatch",
      "longish something longestmatch is here in another",
      "lonely a string you shall find longestmatch small",
    ];

    // When...
    const result = CommonSubstring.longestPrefix(array);

    // Then...
    expect(result).toEqual("lon");
  }
);

test(
  `[CommonSubstring-008]
  Given
    - an array of strings is given
    - and none of them have a common starting prefix
  When
    - longestPrefix is called
  Then
    - an empty string is returned (no match)
`.trim(),
  async () => {
    // Given...
    const array = ["abcd", "bcde", "cdef", "defg"];

    // When...
    const result = CommonSubstring.longestPrefix(array);

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-009]
  Given
    - an array of strings is given
    - and only the first character is common
  When
    - longestPrefix is called
  Then
    - an empty string is returned (no match if just 1 character)
`.trim(),
  async () => {
    // Given...
    const array = ["abcd", "acde", "adef", "aefg"];

    // When...
    const result = CommonSubstring.longestPrefix(array);

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-010]
  Given
    - no array is given
  When
    - longestSuffix is called
  Then
    - an empty string is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = CommonSubstring.longestSuffix();

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-011]
  Given
    - an empty array is given
  When
    - longestSuffix is called
  Then
    - an empty string is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = CommonSubstring.longestSuffix([]);

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-012]
  Given
    - an array of strings is given
  When
    - longestSuffix is called
  Then
    - the longest common ending string is returned
`.trim(),
  async () => {
    // Given...
    const array = [
      "longestmatch full string one",
      "longer full string one stone",
      "longish something longestmatch is here in bone",
      "lonely a string you shall find longestmatch cone",
    ];

    // When...
    const result = CommonSubstring.longestSuffix(array);

    // Then...
    expect(result).toEqual("one");
  }
);

test(
  `[CommonSubstring-013]
  Given
    - an array of strings is given
    - and none of them have a common ending suffix
  When
    - longestSuffix is called
  Then
    - an empty string is returned (no match)
`.trim(),
  async () => {
    // Given...
    const array = ["abcd", "bcde", "cdef", "defg"];

    // When...
    const result = CommonSubstring.longestSuffix(array);

    // Then...
    expect(result).toEqual("");
  }
);

test(
  `[CommonSubstring-014]
  Given
    - an array of strings is given
    - and only the last character is common
  When
    - longestSuffix is called
  Then
    - an empty string is returned (no match if just 1 character)
`.trim(),
  async () => {
    // Given...
    const array = ["bcda", "cdea", "defa", "efga"];

    // When...
    const result = CommonSubstring.longestSuffix(array);

    // Then...
    expect(result).toEqual("");
  }
);
