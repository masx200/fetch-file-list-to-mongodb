import { listonedir } from "./fetchlistdir.js";
import savetodb from "./savetodb.js";

export async function listandsave(
    dir: string,
    bdstoken: string,
    logid: string
) {
    /* 不要缓存了 */
    // let fileslist: (PANFILE | PANDIR)[] = [];
    /* 添加了缓存 */
    // const hascache = await panDircollect
    //     .findOne({ finished: true, path: dir })
    //     .exec();
    // if (hascache) {
    //     console.log(" successfully file cache found " + dir);
    //     const [foundfiles, founddirs] = await Promise.all([
    //         panFilecollect.find({ dir: dir }).exec(),
    //         panDircollect.find({ dir: dir }).exec()
    //     ]);

    //     const fileslist = removeobjrepetition(([
    //         ...foundfiles,
    //         ...founddirs
    //     ] as unknown) as (PANFILE | PANDIR)[]);
    //     /* 去重处理 */
    //     const dirslist = ((fileslist as unknown) as (PANFILE | PANDIR)[])
    //         .filter(fileobj => {
    //             return fileobj.isdir;
    //         })
    //         .map(obj => {
    //             return obj.path;
    //         }) as string[];
    //     const nextpros = dirslist.map(async dir => {
    //         await listandsave(dir, bdstoken, logid);
    //     });
    //     await Promise.all(nextpros);
    // } else
    {
        const fileslist = await listonedir(dir, bdstoken, logid);
        console.log(" successfully fetch file list ", dir /* , fileslist */);
        const savepro = savetodb(fileslist, dir).then(() => {
            console.log(" successfully save data to db ", dir);
        });
        const dirslist = fileslist
            .filter(fileobj => {
                return fileobj.isdir;
            })
            .map(obj => {
                return obj.path;
            });
        const nextpros = dirslist.map(async dir => {
            await listandsave(dir, bdstoken, logid);
        });
        await Promise.all([savepro, ...nextpros]);
    }

    /* 递归查找子文件夹下的文件 */
}
