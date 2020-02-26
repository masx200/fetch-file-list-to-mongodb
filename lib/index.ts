const homepath = `/`;
// import fetch from "node-fetch";
// import cookie from "cookie";
import mongoose from "mongoose";
import process from "process";
import { generatelogid } from "./generatelogid.js";
// console.log(/* listurl, */ /*  fetch, cookie, */ mongoose);
// import fs from "fs";
// const fspromise = fs.promises;
// console.log(fspromise);
import { getbdstokenanduser } from "./init.js";
import { listandsave } from "./listandsave.js";
process.on("unhandledRejection", err => {
    throw err;
});

(async () => {
    const [bdstoken, user] = await getbdstokenanduser();
    const connection = mongoose.connect("mongodb://127.0.0.1/", {
        poolSize: 10,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        dbName: "pan_" + user
    });
    connection.then(() => {
        console.log("mongodb conneted");
    });
    const logid = generatelogid();
    console.log("登陆成功");
    console.log(JSON.stringify({ bdstoken, user, logid }));
    await listandsave(homepath, bdstoken, logid);
    // await connection;
    // console.log("mongodb conneted");

    // mongoose.disconnect().then(() => {
    //     console.log("mongodb disconneted");
    // });
    console.log("文件数据库全部建立完成");
    process.exit();
})();
// fetch(
//     "https://pan.baidu.com/api/list?dir=%2F&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUwODQ1NTk5MzAuOTUyNTQxODE2MTU2MjE1NA==&num=100&order=time&desc=1&clienttype=0&showempty=0&web=1&page=1&channel=chunlei&web=1&app_id=250528",
//     {
//         headers: {
//             accept: "*/*",
//             "accept-language":
//                 "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             cookie:
//                 "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582507482; PANPSC=15151495637702843426%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl43nyaTe1ucW7KGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//         },
//         referrer: "https://pan.baidu.com/disk/home?",
//         referrerPolicy: "no-referrer-when-downgrade",
//         body: null,
//         method: "GET",
//         mode: "cors"
//     }
// );
// fetch(
//     "https://pan.baidu.com/api/list?order=time&desc=1&showempty=0&web=1&page=1&num=100&dir=%2F%E6%88%91%E7%9A%84%E5%AE%89%E5%8D%93%E5%BA%94%E7%94%A8%2Fapps&t=0.6913972743505943&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUwNzUxMzI5MTAuOTA2MDQyODMxOTE4MTkxOQ==&clienttype=0&startLogTime=1582507513291",
//     {
//         headers: {
//             accept: "application/json, text/javascript, */*; q=0.01",
//             "accept-language":
//                 "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "x-requested-with": "XMLHttpRequest",
//             cookie:
//                 "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582507482; PANPSC=17104741590485773119%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4V4y6jLL5Rb3KGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//         },
//         referrer: "https://pan.baidu.com/disk/home?",
//         referrerPolicy: "no-referrer-when-downgrade",
//         body: null,
//         method: "GET",
//         mode: "cors"
//     }
// );
// /* GET /api/list?dir=%2F&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUxNTU0OTg3MjAuNzA5NzgyMTkyMDQzODMxNA==&num=100&order=time&desc=1&clienttype=0&showempty=0&web=1&page=1&channel=chunlei&web=1&app_id=250528 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12
// Accept: */*
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582508457; PANPSC=17979515407805339668%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4ehK7255rgBXKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG
//  */
export {};
