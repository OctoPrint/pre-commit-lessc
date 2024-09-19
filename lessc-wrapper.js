#!/usr/bin/env node

const path = require("path");
const child_process = require("child_process");

let relativeOutputDir = "../css";
let quiet = false;

const lessArgs = [];
const lessFiles = [];

const [, , ...args] = process.argv;
for (const arg of args) {
    if (arg.startsWith("--wrapper-")) {
        const parts = arg.substring("--wrapper-".length).split("=");
        const [key, value] = [parts.shift(), parts.join("=")];
        switch (key) {
            case "output": {
                relativeOutputDir = value;
                break;
            }
            case "quiet": {
                quiet = true;
                break;
            }
        }
    } else if (arg.startsWith("--")) {
        lessArgs.push(arg);
    } else {
        lessFiles.push(arg);
    }
}

if (!quiet) {
    console.log(`less args: ${lessArgs}`);
    console.log(`less files: ${lessFiles}`);
    console.log(`relative output dir: ${relativeOutputDir}`);
    console.log("");
}

const lessc = path.join(__dirname, "node_modules", ".bin", "lessc");
for (const less of lessFiles) {
    const p = path.parse(less);
    const css = path.join(p.dir, relativeOutputDir, `${p.name}.css`);

    const newArgs = [...lessArgs, less, css];

    if (!quiet) console.log(`Running: lessc ${newArgs.join(" ")}`);
    try {
        const stdout = child_process.execFileSync(lessc, newArgs, {
            stdio: "pipe",
            encoding: "utf-8"
        });
        if (!quiet) console.log(stdout);
    } catch (err) {
        if (err.code) {
            // spawning failed
            console.error("Could spawn process: ${err.code}, ${err}");
        } else {
            const {stdout, stderr} = err;
            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);
        }
    }
}
