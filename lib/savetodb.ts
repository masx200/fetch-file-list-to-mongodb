import { posix } from "path";
import { panDircollect, panFilecollect } from './collections.js';
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";

const mapfileobjdir = (obj: PANFILE | PANDIR) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export default async function(fileslist: Array<PANFILE | PANDIR>, dir: string) {
    const files = fileslist.filter((fileobj) => !fileobj.isdir);
    const dirs = fileslist.filter((fileobj) => fileobj.isdir);

    const savepro1 = panFilecollect.insertMany(files.map(mapfileobjdir));
    const savepro2 = panDircollect.insertMany(dirs.map(mapfileobjdir));
    await Promise.all([savepro1, savepro2]);
    /* 如果有已经保存过目录的信息,则设置finished 为true */
    await panDircollect.updateMany({ path: dir }, { finished: true });
    // .find({ path: dir })
    // .update({})
    // .exec();
    // await Promise.all(
    //     fileslist.map(async (fileobj) => {
    //         if (fileobj.isdir) {
    //             await panDir.create(fileobj);
    //         } else {
    //             await panFile.create(fileobj);
    //         }
    //     })
    // );
}
