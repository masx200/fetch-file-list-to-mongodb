const homepath = `/`;
import mongoose from "mongoose";
import process from "process";
import { listandsaveall } from "./listandsave.js";
import opts from "./opts.js";
export async function start() {
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
    await listandsaveall(homepath);
    console.log("文件数据库全部建立完成");
    process.exit();
}
