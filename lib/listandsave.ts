import currentlimiter from "@masx200/async-task-current-limiter";
import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
import { savetodb } from "./savetodb.js";
import { slicearray } from "./slicearray.js";
const listlimiter = currentlimiter(4);

async function listandsaveall(dir: string) {
    const dirslist = await limitedlistandsavesingle(dir);
    await parallellistfolder(dirslist);
}
const limitedlistandsavesingle = listlimiter.asyncwrap(rawlistandsavesingle);
async function rawlistandsavesingle(
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

    return dirslist;
    /* 递归查找子文件夹下的文件 */
}
async function listfolderandsave(dirslist: string[]) {
    if (!dirslist.length) {
        return;
    }

    console.log(dirslist);
    for (let folder of dirslist) {
        await listandsaveall(folder);
    }
}
const parallelnum = 4;
async function parallellistfolder(dirslist: string[]) {
    if (!dirslist.length) {
        return;
    }

    console.log(dirslist);
    const listarrs = slicearray(
        dirslist,
        Math.max(1, Math.round(dirslist.length / parallelnum))
        // 如果count=0,则死循环了
    );
    // console.log(listarrs);
    await Promise.all(listarrs.map((dir) => listfolderandsave(dir)));
    //await listfolderandsave(dirslist);
}
export { listandsaveall };
