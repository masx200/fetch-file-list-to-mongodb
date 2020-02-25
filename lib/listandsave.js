import { listonedir } from "./fetchlistdir.js";
import savetodb from "./savetodb.js";
import { panFilecollect, panDircollect } from "./collections.js";
export async function listandsave(dir, bdstoken, logid) {
    const hascache = await panDircollect
        .findOne({ finished: true, path: dir })
        .exec();
    if (hascache) {
        console.log(" successfully file cache found " + dir);
        const [foundfiles, founddirs] = await Promise.all([
            panFilecollect.find({ dir: dir }).exec(),
            panDircollect.find({ dir: dir }).exec()
        ]);
        const fileslist = removeobjrepetition([...foundfiles, ...founddirs]);
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
        await Promise.all(nextpros);
    } else {
        const fileslist = await listonedir(dir, bdstoken, logid);
        console.log(" successfully fetch file list ", dir);
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
}
function removeobjrepetition(arr) {
    const cache = new Map();
    arr.forEach(obj => {
        cache.set(obj.path, obj);
    });
    return [...cache.values()];
}
