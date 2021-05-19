import currentlimiter from "@masx200/async-task-current-limiter";
import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
import { savetodb } from "./savetodb.js";
import { slicearray } from "./slicearray.js";
const listlimiter = currentlimiter(4);
async function listandsaveall(dir) {
    const dirslist = await limitedlistandsavesingle(dir);
    await parallellistfolder(dirslist);
}
const limitedlistandsavesingle = listlimiter.asyncwrap(rawlistandsavesingle);
async function rawlistandsavesingle(dir) {
    const fileslist = await listonedir(dir);
    console.log("successfully fetch file list ", dir);
    const savepro = savetodb(fileslist).then(() => {
        console.log("successfully save data to db ", dir);
    });
    await savepro;
    const dirslist = fileslist
        .filter((fileobj) => {
            return fileobj.isdir;
        })
        .map((obj) => {
            return obj.path;
        });
    return dirslist;
}
async function listfolderandsave(dirslist) {
    if (!dirslist.length) {
        return;
    }
    console.log(dirslist);
    for (let folder of dirslist) {
        await listandsaveall(folder);
    }
}
const parallelnum = 4;
async function parallellistfolder(dirslist) {
    if (!dirslist.length) {
        return;
    }
    console.log(dirslist);
    const listarrs = slicearray(
        dirslist,
        Math.round(dirslist.length / parallelnum)
    );
    await Promise.all(listarrs.map((dir) => listfolderandsave(dir)));
}
export { listandsaveall };
