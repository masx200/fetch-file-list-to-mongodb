import { posix } from "path";
import { panDircollect, panFilecollect } from "./collections.js";
const mapfileobjdir = (obj) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export default async function (fileslist, dir) {
    const files = fileslist.filter(fileobj => !fileobj.isdir);
    const dirs = fileslist.filter(fileobj => fileobj.isdir);
    const savepro1 = panFilecollect.insertMany(files.map(mapfileobjdir));
    const savepro2 = panDircollect.insertMany(dirs.map(mapfileobjdir));
    await Promise.all([savepro1, savepro2]);
    await panDircollect.updateMany({ path: dir }, { finished: true });
}
