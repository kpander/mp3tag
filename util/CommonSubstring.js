"use strict";
/**
 * @file
 * CommonSubstring.js
 *
 * In no way are the methods in this class optimized for speed or size. They
 * are naive algorithms and are slow with large amounts of data. They are
 * definitely not optimized for efficiency.
 */

module.exports = class CommonSubstring {
  constructor() {}

  // Find the longest starting string in the given array of strings.
  static longestPrefix(array) {
    if (!array) return "";
    if (Array.isArray(array) && !array.length) return "";

    // Sort the array by length and use the smallest string as our reference.
    array.sort(CommonSubstring.sortStringLength);
    const ref = array[array.length - 1];

    let i = 0;
    let len = 1;

    while (i + len <= ref.length) {
      let substr = ref.substr(i, len);
      if (CommonSubstring.arrayItemsBegin(array, substr)) {
        len++;
      } else {
        len--;
        break;
      }
    }

    return len < 2 ? "" : ref.substr(i, len);
  }

  static longestSuffix(array) {
    if (!array) return "";
    if (Array.isArray(array) && !array.length) return "";

    // Reverse all strings in the array, and then we can just run it through
    // longestPrefix().
    const array_reversed = array.map((item) => {
      return item.split("").reverse().join("");
    });

    // Reverse the result and now we have the longest suffix.
    const result = CommonSubstring.longestPrefix(array_reversed);
    return result.split("").reverse().join("");
  }

  // Find the longest common string in the given array of strings.
  static longestSubstring(array) {
    if (!array) return "";
    if (Array.isArray(array) && !array.length) return "";

    let matches = [];

    // Sort the array by length and use the smallest string as our reference.
    array.sort(CommonSubstring.sortStringLength);
    const ref = array[array.length - 1];

    let i = 0;
    let len = 2;

    while (i + len <= ref.length) {
      let substr = ref.substr(i, len);
      if (CommonSubstring.arrayItemsContain(array, substr)) {
        matches.push(substr);
        len++;
      } else {
        i++;
        len = 2;
      }
    }

    matches.sort(CommonSubstring.sortStringLength);
    return matches[0];
  }

  // Do all array items contain the given string?
  static arrayItemsContain(array, str) {
    for (const item of array) {
      if (item.indexOf(str) === -1) return false;
    }
    return true;
  }

  // Do all array items begin with the given string?
  static arrayItemsBegin(array, str) {
    for (const item of array) {
      if (item.indexOf(str) !== 0) return false;
    }
    return true;
  }

  // Do all array items end with the given string?
  static arrayItemsEnd(array, str) {
    const len = str.length;
    for (const item of array) {
      if (item.substr(item.length - len) !== str) {
        return false;
      }
    }
    return true;
  }

  // First is longest. Last is shortest.
  static sortStringLength(a, b) {
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  }
};
