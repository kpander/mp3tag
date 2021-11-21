"use strict";
/*global test, expect*/
/**
 * @file
 * RenameFiles.test.js
 */

const RenameFiles = require("../../classes/RenameFiles");

test(
  `[RenameFiles-001]
  Given
    - no filenames are given
  When
    - renameFiles is called
  Then
    - empty object is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = RenameFiles.renameFiles();

    // Then...
    expect(result).toEqual({});
  }
);

test(
  `[RenameFiles-002]
  Given
    - an empty array
  When
    - renameFiles is called
  Then
    - empty object is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = RenameFiles.renameFiles({});

    // Then...
    expect(result).toEqual({});
  }
);

test(
  `[RenameFiles-003]
  Given
    - an array of filenames
    - that don't need any renaming
  When
    - renameFiles is called
  Then
    - a map is returned, with the values the same as the keys
`.trim(),
  async () => {
    // Given...
    const expected = {
      "01_This_Song_A.mp3": "01_This_Song_A.mp3",
      "02_Song_B.mp3": "02_Song_B.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-004]
  Given
    - an array of filenames
    - and filenames have spaces
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - spaces are replaced with underscores in renamed files
`.trim(),
  async () => {
    // Given...
    const expected = {
      "01 My Song A.mp3": "01_My_Song_A.mp3",
      "02 Song B.mp3": "02_Song_B.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-005]
  Given
    - an array of paths/filenames
    - and filenames have spaces
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - spaces are replaced with underscores in the renamed filenames only
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/first folder/01 My Song A.mp3":
        "/path/to/first folder/01_My_Song_A.mp3",
      "/path/to another/folder/02 Song B.mp3":
        "/path/to another/folder/02_Song_B.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-006]
  Given
    - an array of paths/filenames
    - and filenames have square brackets
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - square brackets are replaced with parentheses in the renamed files only
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/first [folder]/01 My Song A.mp3":
        "/path/to/first [folder]/01_My_Song_A.mp3",
      "/path/to another/[folder]/02 Song B.mp3":
        "/path/to another/[folder]/02_Song_B.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-007]
  Given
    - an array of paths/filenames
    - and filenames have spaces, dashes or underscores before the extension
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - spaces, dashes, underscores before the extension are trimmed
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01 A Song  .mp3": "/path/to/01_A_Song.mp3",
      "/path/to/02 Song__.mp3": "/path/to/02_Song.mp3",
      "/path/to/03 Song--.mp3": "/path/to/03_Song.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-008]
  Given
    - an array of paths/filenames
    - and filenames have leading spaces, dashes or underscores
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - leading spaces, dashes, underscores are trimmed
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/  01 Song A.mp3": "/path/to/01_Song_A.mp3",
      "/path/to/__02 Song B.mp3": "/path/to/02_Song_B.mp3",
      "/path/to/--03 Song C.mp3": "/path/to/03_Song_C.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-009]
  Given
    - an array of paths/filenames
    - and filenames have multiple consecutive spaces, dashes underscores
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - multiple spaces or underscores are replaced with single spaces or underscores
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01 Song   one  and here.mp3":
        "/path/to/01_Song_One_And_Here.mp3",
      "/path/to/02 Song___two  and___there.mp3":
        "/path/to/02_Song_Two_And_There.mp3",
      "/path/to/ 03 Son _ _  __  __ two  _ _  __   .mp3":
        "/path/to/03_Son_Two.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-010]
  Given
    - an array of paths/filenames
    - filenames have consecutive periods
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - consecutive periods are replaced with a single period
    - filenames have each word capitalized
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01 group..of...words.mp3": "/path/to/01_Group.Of.Words.mp3",
      "/path/to/02 another bunch....mp3": "/path/to/02_Another_Bunch.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-011]
  Given
    - an array of paths/filenames
    - filenames have letters inside parentheses
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - words inside parentheses have been capitalized
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01 this is (inside word) here.mp3":
        "/path/to/01_This_Is_(Inside_Word)_Here.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-012]
  Given
    - an array of paths/filenames
    - filenames have common text at the end of each filename
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - the common text is removed
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01 so this is one common crap replace this text.mp3":
        "/path/to/01_So_This_Is_One.mp3",
      "/path/to/02 this is two common crap replace this text.mp3":
        "/path/to/02_This_Is_Two.mp3",
      "/path/to/03 and this is three common crap replace this text.mp3":
        "/path/to/03_And_This_Is_Three.mp3",
      "/path/to/04 this is four common crap replace this text.mp3":
        "/path/to/04_This_Is_Four.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-013]
  Given
    - an array of paths/filenames
    - filenames have common text inside each name
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - the common text is removed, but ONLY in the basename (not the path)
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to common crap replace this text/01 and this is one common crap replace this text.mp3":
        "/path/to common crap replace this text/01_And_This_Is_One.mp3",
      "/path/to/02 this is two common crap replace this text.mp3":
        "/path/to/02_This_Is_Two.mp3",
      "/path/to common crap replace this text/03 this is three common crap replace this text.mp3":
        "/path/to common crap replace this text/03_This_Is_Three.mp3",
      "/path/to/04 this is four common crap replace this text.mp3":
        "/path/to/04_This_Is_Four.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-014]
  Given
    - an array of paths/filenames
    - filenames have common text at the beginning of each filename
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - the common text is removed
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/SameIDHere--01 this is one.mp3": "/path/to/01_This_Is_One.mp3",
      "/path/to/SameIDHere--02 this is two.mp3": "/path/to/02_This_Is_Two.mp3",
      "/path/to/SameIDHere--03 this is three.mp3":
        "/path/to/03_This_Is_Three.mp3",
      "/path/to/SameIDHere--04 this is four.mp3":
        "/path/to/04_This_Is_Four.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-015]
  Given
    - an array of paths/filenames
    - filenames may/may not start with a number
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - each file is numbered
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/my song one.mp3": "/path/to/01_My_Song_One.mp3",
      "/path/to/your song two.mp3": "/path/to/02_Your_Song_Two.mp3",
      "/path/to/and song three.mp3": "/path/to/03_And_Song_Three.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-016]
  Given
    - an array of paths/filenames
    - filenames start with a 3-digit number
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - each file is numbered using 3 digits
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/101 my song one.mp3": "/path/to/101_My_Song_One.mp3",
      "/path/to/102 your song two.mp3": "/path/to/102_Your_Song_Two.mp3",
      "/path/to/201 and song three.mp3": "/path/to/201_And_Song_Three.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-017]
  Given
    - an array of paths/filenames
    - filenames are numbered using various formats
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - each file is numbered and cleaned properly
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01.my song one.mp3": "/path/to/01_My_Song_One.mp3",
      "/path/to/02. your song two.mp3": "/path/to/02_Your_Song_Two.mp3",
      "/path/to/03-and song three.mp3": "/path/to/03_And_Song_Three.mp3",
      "/path/to/04 - this four.mp3": "/path/to/04_This_Four.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-018]
  Given
    - an array of paths/filenames
    - filenames with capitals after punctuation retain their case
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - each file is numbered and cleaned properly
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01. My.Song.One.mp3": "/path/to/01_My.Song.One.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-019]
  Given
    - an array of paths/filenames
    - filenames with hyphens
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - hyphens are replaced with underscores
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01. My-Song-One.mp3": "/path/to/01_My_Song_One.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-020]
  Given
    - an array of paths/filenames
    - with common text starting after the file number
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - common text is removed
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01-Justice-Genesis.mp3": "/path/to/01_Genesis.mp3",
      "/path/to/02-Justice - D.A.N.C.E.mp3": "/path/to/02_D.A.N.C.E.mp3",
      "/path/to/03-Justice-Phantom-1.mp3": "/path/to/03_Phantom_1.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-021]
  Given
    - an array of paths/filenames
    - with common text starting before the file number
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - common text is removed
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/Justice-01--Genesis.mp3": "/path/to/01_Genesis.mp3",
      "/path/to/Justice-02- - D.A.N.C.E.mp3": "/path/to/02_D.A.N.C.E.mp3",
      "/path/to/Justice-03-Phantom-1.mp3": "/path/to/03_Phantom_1.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[RenameFiles-022]
  Given
    - an array of paths/filenames
    - with space/hyphen/space pattern
  When
    - renameFiles is called
  Then
    - a map of source/renamed files is returned
    - consecutive underscores are reduced
`.trim(),
  async () => {
    // Given...
    const expected = {
      "/path/to/01-someword_-_another_word.mp3":
        "/path/to/01_Someword_Another_Word.mp3",
    };

    // When...
    const result = RenameFiles.renameFiles(Object.keys(expected));

    // Then...
    expect(result).toEqual(expected);
  }
);
