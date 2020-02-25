import { posix } from "path";
import { panDircollect, panFilecollect } from "./collections.js";
const mapfileobjdir = (obj) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export default async function (fileslist, dir) {
    const files = fileslist.filter(fileobj => !fileobj.isdir);
    const dirs = fileslist.filter(fileobj => fileobj.isdir === 1);
    const filetosave = files.map(mapfileobjdir);
    const dirtosave = dirs.map(mapfileobjdir);
    const savefilepro = filetosave.map(obj => {
        return panFilecollect
            .updateMany({ path: obj.path }, obj, {
            upsert: true
        })
            .exec();
    });
    const savedirpro = dirtosave.map(obj => {
        return panDircollect
            .updateMany({ path: obj.path }, obj, {
            upsert: true
        })
            .exec();
    });
    await Promise.all([...savefilepro, ...savedirpro]);
    await panDircollect.updateMany({ path: dir }, { finished: true });
}
