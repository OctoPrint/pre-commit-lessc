# pre-commit-lessc

pre-commit compatible wrapper for lessc.

Will turn a list of attached `.less` files into single calls of `lessc` with `source` and `target` files instead.

The relative output path for the `target` is generated from the `less` path and can be controlled through the 
`--wrapper-output` command line option, see below.

## Usage

``` yaml
  - repo: https://github.com/OctoPrint/pre-commit-lessc
    rev: 4.2.0
    hooks:
      - id: lessc
        args: ["--wrapper-quiet", "--clean-css=--s1 --advanced --compatibility=ie8"]
        additional_dependencies: ["less-plugin-clean-css"]
        files: ^(src/octoprint/static/less/(octoprint|recovery|login)\.less|src/octoprint/plugins/.*/static/less/.*\.less$)
```

### Available command line options

The wrapper's command line options are all prefixed with `--wrapper-`. Anything not prefixed that way will be 
forwarded directly to the `lessc` call.

- `--wrapper-output`: Relative output for the generated css files, defaults to `../css`
- `--wrapper-quiet`: Suppress logging (unless there's a runtime error)

## License

MIT
