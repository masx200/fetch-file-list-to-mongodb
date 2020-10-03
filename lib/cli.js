#!/usr/bin/env node
import parseargs from "@masx200/mini-cli-args-parser";
import opts from "./opts.js";
import { start } from "./start.js";
const args = parseargs(process.argv.slice(2));
console.log(args);
if (args["collect"]) {
    opts.collect = args["collect"];
}
if (args["mongourl"]) {
    opts.mongourl = args["mongourl"];
}
if (args["db"]) {
    opts.db = args["db"];
}
console.log(opts);
start();
