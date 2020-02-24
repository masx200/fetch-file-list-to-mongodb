import cookie from "cookie";
import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { limitedfetch as fetch } from "./limitfetch.js";
const homeurl = `https://pan.baidu.com/disk/home`;
async function savecookies(setcookie) {
    const cooobj = cookie.parse(setcookie);
    const panobj = await fsextra.readJSON(jsonfile);
    await fsextra.writeJSON(jsonfile, { ...panobj, ...cooobj }, { spaces: 4 });
}
async function gethomehtml() {
    const panobj = await fsextra.readJSON(jsonfile);
    const coostr = objtostrcookie(panobj);
    const req = await fetch(homeurl, {
        headers: {
            "Accept-Encoding": ` gzip, deflate, br`,
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12`,
            Connection: `keep-alive`,
            Host: `pan.baidu.com`,
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            cookie: coostr,
            Referer: "https://pan.baidu.com/disk/home?"
        },
        body: undefined,
        method: "GET"
    });
    if (req.ok) {
        const setcookie = req.headers.get("set-cookie");
        if (setcookie) {
            savecookies(setcookie);
        }
        return req.text();
    }
    else {
        throw Error("fetch failed " + req.status + " " + req.statusText + " " + homeurl);
    }
}
export function objtostrcookie(panobj) {
    return Object.entries(panobj)
        .map(([key, value]) => {
        return cookie.serialize(key, String(value));
    })
        .join(";");
}
export async function getbdstokenanduser() {
    const homehtml = await gethomehtml();
    return parsehtmlstoken(homehtml);
}
function parsehtmlstoken(html) {
    const reg = /initPrefetch\(\'(.+)\'\,\ \'(.+)\'\)\;/g;
    const RegExpExecArray = reg.exec(html);
    if (RegExpExecArray) {
        const [, bdstoken, user] = RegExpExecArray;
        return [bdstoken, user];
    }
    throw Error("failed parse bdstoken " + html);
}