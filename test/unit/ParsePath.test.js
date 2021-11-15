"use strict";
/*global test, expect*/
/**
 * @file
 * ParsePath.test.js
 */

const path = require("path");
const ParsePath = require("../../classes/ParsePath");

test(
  `[ParsePath-001]
  Given
    - no pathname
  When
    - artistAlbumFromPath is called
  Then
    - empty object is returned
`.trim(),
  async () => {
    // Given...
    // When...
    const result = ParsePath.artistAlbumFromPath();

    // Then...
    expect(result).toEqual({});
  }
);

test(
  `[ParsePath-002]
  Given
    - a path with artist/album delimited by tilde
  When
    - artistAlbumFromPath is called
  Then
    - object with 'artist' and 'album' keys is returned
`.trim(),
  async () => {
    // Given...
    const pathname = "myartist~myalbum";

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-003]
  Given
    - a path with artist/album delimited by tilde
    - there are spaces around the delimiter
  When
    - artistAlbumFromPath is called
  Then
    - values have no leading/trailing spaces
`.trim(),
  async () => {
    // Given...
    const pathname = " myartist  ~  myalbum  ";

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-004]
  Given
    - a path with artist/album delimited by tilde
    - there is more than 1 delimiter in the pathname
  When
    - artistAlbumFromPath is called
  Then
    - the first item is the artist
    - the remainder extends to the end of the string
`.trim(),
  async () => {
    // Given...
    const pathname = " myartist  ~  myalbum ~ another tilde ";

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum ~ another tilde",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-005]
  Given
    - a path with artist/album delimited by hyphen
  When
    - artistAlbumFromPath is called
  Then
    - object with 'artist' and 'album' keys is returned
`.trim(),
  async () => {
    // Given...
    const pathname = "myartist-myalbum";

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-006]
  Given
    - a path with artist/album delimited by hyphen
    - there is more than 1 delimiter in the pathname
  When
    - artistAlbumFromPath is called
  Then
    - the first item is the artist
    - the remainder extends to the end of the string
`.trim(),
  async () => {
    // Given...
    const pathname = "myartist -  myalbum - and another ";

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum - and another",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-007]
  Given
    - a path without delimiters
    - a path without hierarchy
  When
    - artistAlbumFromPath is called
  Then
    - an empty object is returned
`.trim(),
  async () => {
    // Given...
    const pathname = "myartistmyalbum";

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);

    // Then...
    expect(result).toEqual({});
  }
);

test(
  `[ParsePath-008]
  Given
    - a path in format "/path/to/artist/album"
  When
    - artistAlbumFromPath is called
  Then
    - the artist and album are taken from the path
`.trim(),
  async () => {
    // Given...
    const pathname = path.join("path", "to", "myartist", "myalbum");

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-009]
  Given
    - a path in format "/path/to/artist~album"
  When
    - artistAlbumFromPath is called
  Then
    - the artist and album are taken from the path
`.trim(),
  async () => {
    // Given...
    const pathname = path.join("path", "to", "myartist~myalbum");

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);

test(
  `[ParsePath-009]
  Given
    - a path in format "/path/to/artist~album"
    - where parent items in the path include the delimiter
  When
    - artistAlbumFromPath is called
  Then
    - the artist and album are taken from the path
`.trim(),
  async () => {
    // Given...
    const pathname = path.join("path", "to~delim", "myartist~myalbum");

    // When...
    const result = ParsePath.artistAlbumFromPath(pathname);
    const expected = {
      artist: "myartist",
      album: "myalbum",
    };

    // Then...
    expect(result).toEqual(expected);
  }
);
