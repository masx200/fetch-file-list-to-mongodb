// import fetch from "node-fetch";
import { limitedfetch as fetch } from "./limitfetch.js";
import fsextra from "fs-extra";
import { PANENV } from "./index.js";
import { getbdstokenanduser } from "./init.js";
import { jsonfile } from "./files.js";
import { objtostrcookie } from "./objtostrcookie.js";
const operationurl = `https://pan.baidu.com/api/filemanager`;
/* 每次不能太多2000个1000个500个 */
function slicearray<T>(data: Array<T>, count: number): Array<T>[] {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
export async function deletefiles(files: Array<string>): Promise<any[]> {
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
    const listlimit = 200;
    if (listlimit < files.length) {
        return (
            await Promise.all(
                slicearray(files, listlimit).map(list => {
                    return deletefiles(list);
                })
            )
        ).flat();
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
        const info = data?.info;
        if (Array.isArray(info) && info.length) {
            return info;
        } else {
            throw Error("data error " + JSON.stringify(data));
        }
        // return data;
    } else {
        throw Error(
            "fetch failed " + req.status + " " + req.statusText + " " + urlhref
        );
    }
}
// {
//   errno: 0,
//   info: [],
//   request_id: 1320023046338866700,
//   taskid: 823150949751162
// }
// /* {
//   errno: 3,
//   info: [],
//   request_id: 1319996614583890200,
//   num_limit: 2000
// } */
// POST /api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxMzgwODE4MjAuODAwNjQzMDEzMzE1OTA1NQ==&clienttype=0 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// Content-Length: 91
// Accept: application/json, text/javascript, */*; q=0.01
// X-Requested-With: XMLHttpRequest
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// Origin: https://pan.baidu.com
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG

// fetch("https://pan.baidu.com/api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxMzgwODE4MjAuODAwNjQzMDEzMzE1OTA1NQ==&clienttype=0", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "filelist=%5B%22%2F%E7%AE%A1%E7%90%86%E5%91%98%E5%8F%96%E5%BE%97%E6%9D%83%E9%99%90.reg%22%5D",
//   "method": "POST",
//   "mode": "cors"
// });

// fetch("https://pan.baidu.com/api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxNDEzNTI2NTAuMjEzMzc5MDc5ODYxNjIzNTI=&clienttype=0", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "filelist=%5B%22%2F%E7%AE%A1%E7%90%86%E5%91%98%E5%8F%96%E5%BE%97%E6%9D%83%E9%99%90.reg%22%2C%22%2FGraphicsMagick-1.3.34-Q16-win64-dll(1).exe%22%5D",
//   "method": "POST",
//   "mode": "cors"
// });

// HTTP/1.1 200 OK
// Cache-Control: no-cache
// Connection: keep-alive
// Content-Encoding: gzip
// Content-Type: application/json; charset=UTF-8
// Date: Wed, 26 Feb 2020 10:43:29 GMT
// Flow-Level: 3
// Logid: 1316893073357737816
// Server: nginx
// Vary: Accept-Encoding
// X-Powered-By: BaiduCloud
// Yld: 163971564590141272
// Yme: ZIGW+Sw8QE4TYysERnb+qnFLvvIAQwrrqANFwSWEmrzoExk/MHc=
// Content-Length: 95

// {"errno":0,"info":[],"request_id":1316893073357737816,"taskid":935102172499812}

// fetch("https://pan.baidu.com/api/filemanager?opera=delete&async=1&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxNDEzNTI2NTAuMjEzMzc5MDc5ODYxNjIzNTI=&clienttype=0", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "filelist=%5B%22%2F%E7%AE%A1%E7%90%86%E5%91%98%E5%8F%96%E5%BE%97%E6%9D%83%E9%99%90.reg%22%2C%22%2FGraphicsMagick-1.3.34-Q16-win64-dll(1).exe%22%5D",
//   "method": "POST",
//   "mode": "cors"
// });

// {"errno":12,"info":[{"errno":-9,"path":"\/\u7ba1\u7406\u5458\u53d6\u5f97\u6743\u9650.reg"},{"errno":-9,"path":"\/GraphicsMagick-1.3.34-Q16-win64-dll(1).exe"}],"request_id":1317091197014819351}
