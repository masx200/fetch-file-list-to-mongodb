const homepath = `/`;
// import { initPANENV } from "@masx200/fetch-baidu-pan-files";
import mongoose from "mongoose";
import process from "process";
// import { homepath } from "./index.js";
import { listandsaveall } from "./listandsave.js";
import opts from "./opts.js";
export async function start() {
    // const panenv = await initPANENV();
    const connection = mongoose.connect(opts.mongourl, {
        poolSize: 10,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        dbName: opts.db,
    });
    await connection.then(() => {
        console.log("mongodb conneted");
    });
    console.log("数据库登陆成功");
    // console.log(JSON.stringify(panenv));
    await listandsaveall(homepath /* , bdstoken, logid */);
    console.log("文件数据库全部建立完成");
    process.exit();
}
