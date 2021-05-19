import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
import savetodb from "./savetodb.js";

export async function listandsave(
    dir: string
    /*  bdstoken: string,
    logid: string */
) {
    {
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
        for (let folder of dirslist) {
            await listandsave(folder);
        }
    }

    /* 递归查找子文件夹下的文件 */
}
