import { posix } from "path";
import { panFilecollect } from "./collections.js";
const mapfileobjdir = (obj) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export async function savetodb(fileslist) {
    const files = fileslist.filter((fileobj) => !fileobj.isdir);
    const filetosave = files.map(mapfileobjdir);
    const savefilepro = filetosave.reduce(async (prev, obj) => {
        await prev;
        console.log("成功保存到file数据库", obj.path);
        return await panFilecollect
            .updateMany({ path: obj.path }, obj, {
                upsert: true,
            })
            .exec();
    }, Promise.resolve());
    await savefilepro;
}
