export const homepath = `/`;
import process from "process";
process.on("unhandledRejection", err => {
    throw err;
});
