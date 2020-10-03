import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
import savetodb from "./savetodb.js";
export async function listandsave(dir) {
    {
        const fileslist = await listonedir(dir);
        console.log(" successfully fetch file list ", dir);
        const savepro = savetodb(fileslist).then(() => {
            console.log(" successfully save data to db ", dir);
        });
        const dirslist = fileslist
            .filter((fileobj) => {
                return fileobj.isdir;
            })
            .map((obj) => {
                return obj.path;
            });
        await savepro;
        for (let folder of dirslist) {
            await listandsave(folder);
        }
    }
}
