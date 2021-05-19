// export const homepath = `/`;

import process from "process";
import { start } from "./start.js";

process.on("unhandledRejection", (err) => {
    throw err;
});
export { start };
