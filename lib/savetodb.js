import { posix } from "path";
import { panDircollect, panFilecollect } from "./collections.js";
const mapfileobjdir = (obj) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export default async function (fileslist) {
    const files = fileslist.filter(fileobj => !fileobj.isdir);
    const dirs = fileslist.filter(fileobj => fileobj.isdir === 1);
    const filetosave = files.map(mapfileobjdir);
    const dirtosave = dirs.map(mapfileobjdir);
    const savefilepro = filetosave.reduce(async (prev, obj) => {
        await prev;
        console.log("保存到file数据库", obj);
        return await panFilecollect
            .updateMany({ path: obj.path }, obj, {
            upsert: true
        })
            .exec();
    }, Promise.resolve());
    const savedirpro = dirtosave.reduce(async (prev, obj) => {
        await prev;
        console.log("保存到dir数据库", obj);
        return await panDircollect
            .updateMany({ path: obj.path }, obj, {
            upsert: true
        })
            .exec();
    }, Promise.resolve());
    await Promise.all([savefilepro, savedirpro]);
}
