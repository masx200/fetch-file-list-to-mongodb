import currentlimiter from "@masx200/async-task-current-limiter";
import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
import { savetodb } from "./savetodb.js";
import { slicearray } from "./slicearray.js";
const listlimiter = currentlimiter(4);
const listandsave = listlimiter.asyncwrap(rawlistandsave);
async function rawlistandsave(dir) {
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
    await parallellistfolder(dirslist);
}
async function listfolderandsave(dirslist) {
    for (let folder of dirslist) {
        await listandsave(folder);
    }
}
const parallelnum = 4;
async function parallellistfolder(dirslist) {
    console.log(dirslist);
    const listarrs = slicearray(
        dirslist,
        Math.round(dirslist.length / parallelnum)
    );
    console.log(listarrs);
    await Promise.all(listarrs.map((dir) => listfolderandsave(dir)));
}
export { listandsave };
