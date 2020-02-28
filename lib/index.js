import process from "process";
process.on("unhandledRejection", err => {
    throw err;
});
import { start } from "./start.js";
export { start };
