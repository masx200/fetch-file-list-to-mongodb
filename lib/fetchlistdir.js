import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { objtostrcookie } from "./init.js";
import { limitedfetch as fetch } from "./limitfetch.js";
const listurl = `https://pan.baidu.com/api/list`;
let coostr;
function gettimestamp() {
    return String(new Date().getTime());
}
export async function listonedir(dir, bdstoken, logid) {
    try {
        const params = {
            order: "time",
            desc: "1",
            showempty: "0",
            web: "1",
            page: "1",
            dir: dir,
            channel: "chunlei",
            app_id: "250528",
            bdstoken: bdstoken,
            logid: logid,
            clienttype: "0",
            startLogTime: gettimestamp()
        };
        if (!coostr) {
            const panobj = await fsextra.readJSON(jsonfile);
            coostr = objtostrcookie(panobj);
        }
        const listapi = new URL(listurl);
        listapi.search = String(new URLSearchParams(params));
        const urlhref = String(listapi);
        const req = await fetch(urlhref, {
            headers: {
                "Accept-Encoding": "gzip, deflate, br",
                Referer: `https://pan.baidu.com/disk/home?`,
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12",
                Connection: "keep-alive",
                Host: "pan.baidu.com",
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language":
                    "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                cookie: coostr
            },
            body: undefined,
            method: "GET"
        });
        if (req.ok) {
            const data = await req.json();
            const errno =
                data === null || data === void 0 ? void 0 : data.errno;
            if (
                typeof errno === "number" &&
                errno === 0 &&
                Array.isArray(
                    data === null || data === void 0 ? void 0 : data.list
                )
            ) {
                const list =
                    data === null || data === void 0 ? void 0 : data.list;
                return list;
            } else {
                throw Error("data error " + JSON.stringify(data));
            }
        } else {
            throw Error(
                "fetch failed " +
                    req.status +
                    " " +
                    req.statusText +
                    " " +
                    urlhref
            );
        }
    } catch (e) {
        console.error("获取文件列表错误,5秒后重试." + dir);
        console.error(e);
        await new Promise(r => {
            setTimeout(r, 5000);
        });
        return listonedir(dir, bdstoken, logid);
    }
}
