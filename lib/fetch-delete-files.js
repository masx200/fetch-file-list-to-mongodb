import { limitedfetch as fetch } from "./limitfetch.js";
import fsextra from "fs-extra";
import { PANENV } from "./index.js";
import { getbdstokenanduser } from "./init.js";
import { jsonfile } from "./files.js";
import { objtostrcookie } from "./objtostrcookie.js";
const operationurl = `https://pan.baidu.com/api/filemanager`;
function slicearray(data, count) {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
export async function deletefiles(files) {
    if (!PANENV.bdstoken || !PANENV.user) {
        let [bdstoken, user] = await getbdstokenanduser();
        PANENV.bdstoken = bdstoken;
        PANENV.user = user;
    }
    if (!PANENV.cookie) {
        const panobj = await fsextra.readJSON(jsonfile);
        let coostr = objtostrcookie(panobj);
        PANENV.cookie = coostr;
    }
    const listlimit = 100;
    if (listlimit < files.length) {
        return (await Promise.all(slicearray(files, listlimit).map(list => {
            return deletefiles(list);
        }))).flat();
    }
    const params = {
        opera: "delete",
        async: "1",
        onnest: "fail",
        channel: "chunlei",
        web: "1",
        app_id: "250528",
        bdstoken: PANENV.bdstoken,
        logid: PANENV.logid,
        clienttype: "0"
    };
    const listapi = new URL(operationurl);
    listapi.search = String(new URLSearchParams(params));
    const urlhref = String(listapi);
    const body = "filelist=" + encodeURIComponent(JSON.stringify(files));
    const headers = {
        Host: "pan.baidu.com",
        Connection: "keep-alive",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16`,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://pan.baidu.com",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: " https://pan.baidu.com/disk/home?",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        Cookie: PANENV.cookie
    };
    const req = await fetch(urlhref, { method: "POST", body, headers });
    if (req.ok) {
        const data = await req.json();
        const info = data === null || data === void 0 ? void 0 : data.info;
        if (Array.isArray(info) && info.length) {
            return info;
        }
        else {
            throw Error("data error " + JSON.stringify(data));
        }
    }
    else {
        throw Error("fetch failed " + req.status + " " + req.statusText + " " + urlhref);
    }
}
