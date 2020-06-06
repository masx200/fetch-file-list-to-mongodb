const homepath = `/`;
// import { initPANENV } from "@masx200/fetch-baidu-pan-files";
import mongoose from "mongoose";
import process from "process";
// import { homepath } from "./index.js";
import { listandsave } from "./listandsave.js";

export async function start() {
    // const panenv = await initPANENV();
    const connection = mongoose.connect("mongodb://127.0.0.1/", {
        poolSize: 10,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        dbName: "baidupan"
    });
    connection.then(() => {
        console.log("mongodb conneted");
    });
    console.log("登陆成功");
    // console.log(JSON.stringify(panenv));
    await listandsave(homepath /* , bdstoken, logid */);
    console.log("文件数据库全部建立完成");
    process.exit();
}
