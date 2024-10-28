// #!/usr/bin/env node

import parseargs from "@masx200/mini-cli-args-parser";
import opts from "./opts.js";
import { start } from "./start.js";
process.on("unhandledRejection", (err) => {
    throw err;
});
const args = parseargs(process.argv.slice(2));
console.log(args);
if (args["collect"]) {
    opts.collect = String(args["collect"]);
}
if (args["mongourl"]) {
    opts.mongourl = String(args["mongourl"]);
}
if (args["db"]) {
    opts.db = String(args["db"]);
}
console.log(opts);
start();
