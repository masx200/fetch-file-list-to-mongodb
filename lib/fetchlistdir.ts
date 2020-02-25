// import fetch from "node-fetch";
import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
// import cookie from "cookie";
import { objtostrcookie } from "./init.js";
import { limitedfetch as fetch } from "./limitfetch.js";
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
const listurl = `https://pan.baidu.com/api/list`;
let coostr: string | undefined;
function gettimestamp() {
    return String(new Date().getTime());
}
export async function listonedir(
    dir: string,
    bdstoken: string,
    logid: string
): Promise<Array<PANFILE | PANDIR>> {
    try {
        const params = {
            order: "time",
            desc: "1",
            showempty: "0",
            web: "1",
            page: "1",
            dir: dir,
            // t: "0.5937695130287173",
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
            // console.log(req.headers);
            // const setcookie = req.headers.get("set-cookie");
            // if (setcookie) {
            //     const cooobj = cookie.parse(setcookie);
            //     const panobj = await fsextra.readJSON(jsonfile);
            //     await fsextra.writeJSON(
            //         jsonfile,
            //         { ...panobj, ...cooobj },
            //         { spaces: 4 }
            //     );
            // }
            const data = await req.json();
            const errno = data?.errno;
            if (
                typeof errno === "number" &&
                errno === 0 &&
                Array.isArray(data?.list)
            ) {
                const list = data?.list;
                // if (Array.isArray(list)) {
                return list;
                // } else {
                //     throw Error("data error " + data);
                // }
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

// /* GET /api/list?order=time&desc=1&showempty=0&web=1&page=1&dir=%2F&t=0.5937695130287173&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUyMDA2MTIyNzAuOTI0Mjc0NDIyOTg2MzAyMg==&clienttype=0&startLogTime=1582520061227 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// accept: application/json, text/javascript, */*; q=0.01
// x-requested-with: XMLHttpRequest
// accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582519632; PANPSC=6954538119870771888%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4BkARd%2BGmRi%2FKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG
//  */
// category: 6
// fs_id: 457850713458220
// isdir: 0
// local_ctime: 0
// local_mtime: 0
// md5: "8c65e1da8n09268f98bfec59e157a067"
// oper_id: 0
// path: "/密码破解RAR-Password-Recovery含注册码.zip"
// server_ctime: 1582448700
// server_filename: "密码破解RAR-Password-Recovery含注册码.zip"
// server_mtime: 1582448700
// share: 0
// size: 4411681
// unlist: 0
//
// category: 6
// dir_empty: 0
// empty: 0
// fs_id: 268065844320272
// isdir: 1
// local_ctime: 1582359185
// local_mtime: 1582359185
// oper_id: 0
// path: "/我的安卓应用"
// server_ctime: 1582359185
// server_filename: "我的安卓应用"
// server_mtime: 1582359185
// share: 0
// size: 0
// unlist: 0
// https://github.com/iikira/BaiduPCS-Go/blob/master/docs/file_data_apis_list.md
// /* // {"errno":0,"guid_info":"","list":[{"server_filename":"\u6211\u7684\u5b89\u5353\u5e94\u7528",
// "category":6,"unlist":0,"isdir":1,"dir_empty":0,"oper_id":0,"server_ctime":1582359185,
// "local_mtime":1582359185,"size":0,"share":0,"server_mtime":1582359185,"path":"\/
// \u6211\u7684\u5b89\u5353\u5e94\u7528","local_ctime":1582359185,"empty":0,"fs_id":268065844320272},
// {"server_filename":"PanDownload","category":6,"unlist":0,"isdir":1,"dir_empty":1,
// "oper_id":1157661021,"server_ctime":1582353469,"local_mtime":1582353468,"size":0,"share":0,
// "server_mtime":1582353469,"path":"\/PanDownload","local_ctime":1582353468,"empty":0,
// "fs_id":154839466487292},{"server_filename":"\u6211\u7684\u56fe\u7247","category":6,"unlist":0,

// "isdir":1,"dir_empty":1,"oper_id":0,"server_ctime":1582252484,"local_mtime":1582252484,"size":0,
// "share":0,"server_mtime":1582252484,"path":"\/\u6211\u7684\u56fe\u7247","local_ctime":1582252484,
// "empty":0,"fs_id":769245128764691},{"server_filename":"\u6211\u7684\u8d44\u6e90","category":6,
// "unlist":0,"isdir":1,"dir_empty":1,"oper_id":0,"server_ctime":1582087140,"local_mtime":1582087140,
// "size":0,"share":0,"server_mtime":1582087140,"path":"\/\u6211\u7684\u8d44\u6e90",
// "local_ctime":1582087140,"empty":0,"fs_id":130798388676430},

