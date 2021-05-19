import currentlimiter from "@masx200/async-task-current-limiter";
import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
import { savetodb } from "./savetodb.js";
import { slicearray } from "./slicearray.js";
const listlimiter = currentlimiter(5);

const listandsave = listlimiter.asyncwrap(rawlistandsave);
async function rawlistandsave(
    dir: string
    /*  bdstoken: string,
    logid: string */
) {
    const fileslist = await listonedir(dir /* , bdstoken, logid */);
    console.log("successfully fetch file list ", dir /* , fileslist */);
    const savepro = savetodb(fileslist /* , dir */).then(() => {
        console.log("successfully save data to db ", dir);
    });

    // const nextpros = dirslist.map(async (dir) => {
    //     await listandsave(dir /* , bdstoken, logid */);
    // });
    // 放防止内存溢出,先保存到数据库
    await savepro;
    const dirslist = fileslist
        .filter((fileobj) => {
            return fileobj.isdir;
        })
        .map((obj) => {
            return obj.path;
        });
    // await Promise.all(nextpros);
    // await Promise.all([savepro, ...nextpros]);
    /* <--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory */

    await parallellistfolder(dirslist);

    /* 递归查找子文件夹下的文件 */
}
async function listfolderandsave(dirslist: string[]) {
    for (let folder of dirslist) {
        await listandsave(folder);
    }
}
const parallelnum = 3;
async function parallellistfolder(dirslist: string[]) {
    const listarrs = slicearray(
        dirslist,
        Math.round(dirslist.length / parallelnum)
    );
    await Promise.all(listarrs.map((dir) => listfolderandsave(dir)));
    //await listfolderandsave(dirslist);
}
export { listandsave };
