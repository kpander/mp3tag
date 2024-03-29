# CHANGELOG

- v2.3.2 (2022-12-02)

  - Maintenance: Adds info.txt details to program help
    - See [Github issue](https://github.com/kpander/mp3tag/issues/15)

- v2.3.1 (2021-11-21)

  - Bugfix: File renaming bug fixed for consecutive underscores
    - See [Github issue](https://github.com/kpander/mp3tag/issues/11)

- v2.3.0 (2021-11-20)

  - Feature: Adds ability to disable file renaming during tagging
    - Usage: `$ tag /path/to/files --no-rename`
    - See [Github issue](https://github.com/kpander/mp3tag/issues/8)

- v2.2.1 (2021-11-20)

  - Bugfix: File renaming consistency improved
    - Fixes consecutive periods, capitalization after periods, common strings
    - Preserves existing capitalization

- v2.2.0 (2021-11-16)

  - Feature: Adds ability to display tags for files in the given folder
    - Usage: `$ tag /path/to/files --list`
    - See [Github issue](https://github.com/kpander/mp3tag/issues/4)

- v2.1.0 (2021-11-16)

  - Behaviour change: If the `info.txt` file doesn't contain entries for `artist` or `album`, we determine them from the path name
    - See [Github issue](https://github.com/kpander/mp3tag/issues/1)

- v2.0.0 (2021-10-20)

  - Rewritten in nodeJS
  - PHP version archived

- v1.0.2 (2020-07-25)

  - Updates getid3 library to v1.9.20 to address PHP deprecation issues

- v1.0.3 (2019-01-11)

  - Updates getid3 library to v1.9.16 to address PHP deprecation issues

- v1.0.0 (2008-10-06)

  - Initial release
