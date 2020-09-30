import { posix } from "path";
import { 
//panDircollect,
 panFilecollect } from "./collections.js";
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";

const mapfileobjdir = (obj: PANFILE | PANDIR) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export default async function (
    fileslist: Array<PANFILE | PANDIR> /* , dir: string */
) {
    const files = fileslist.filter((fileobj) => !fileobj.isdir);
   // const dirs = fileslist.filter((fileobj) => fileobj.isdir === 1);
    const filetosave = files.map(mapfileobjdir);
   // const dirtosave = dirs.map(mapfileobjdir);
    // const savepro1 = panFilecollect.updateMany(,files.map(mapfileobjdir),);
    // const savepro2 = panDircollect.updateMany(dirs.map(mapfileobjdir));
    // [o
