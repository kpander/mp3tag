# mp3tagger

## Overview

Command-line tool to:

- Apply ID3 tags to MP3 files
- Rename MP3 files to a consistent pattern

This is an automation tool, built to support the way I manage sound files.

## Installation

After cloning the repo:

```
$ npm install -g
```

## Assumptions

A folder contains:

- Files for a single album
- An `info.txt` file defining metadata for the album
- (Optional) A `cover.jpg` cover art file

Subfolders will be ignored.

Files that don't have a `.mp3` extension will be ignored.

## Usage

To process files in the current folder:

```
$ tag .
```

To show what processing would occur for files in the current folder:

```
$ tag . --dry-run
```

### `info.txt` format

Example `info.txt` file looks like this (case is sensitive):

```
ARTIST=King Crimson
ALBUM=Court of the Crimson King
YEAR=1971
GENRE=Progressive Rock
URL=http://allmusic.com/something
```

Note: The **GENRE** value should be text (and NOT a number), and should come from [this list](https://en.wikipedia.org/wiki/List_of_ID3v1_Genres).

### Automatic detection of 'artist' and 'album' tags

If the album name or artist name is not defined in the `info.txt` file, we determine it from the path. The following patterns are checked in the path:

- Tilde delimiter: `/path/to/artist name ~ album name`
- Hyphen delimiter: `/path/to/artist name - album name`
- Parent/child path names: `/path/to/artist name/album name`

### Cover art

If the folder contains a `cover.jpg` file, we assume this is the cover art image which will be added to all mp3 files in the folder.

## Exit Codes

| Exit code | Description       |
| :-------- | :---------------- |
| 0         | Normal exit       |
| 1         | Exited with error |

## TODO

- [ ] Document the default file rename transformations
- [ ] Add an interactive mode to prompt for missing metadata when `info.txt` doesn't exist, or isn't complete
- [ ] Add a switch to disable interactive mode
- [ ] Add a switch to export existing ID3 data to `info.txt` (or a specified text file)
