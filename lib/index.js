const homepath = `/`;
import mongoose from "mongoose";
import process from "process";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { listandsave } from "./listandsave.js";
process.on("unhandledRejection", err => {
    throw err;
});
(async () => {
    const connection = mongoose.connect("mongodb://127.0.0.1/pan", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    connection.then(() => {
        console.log("mongodb conneted");
    });
    const [bdstoken, user] = await getbdstokenanduser();
    const logid = generatelogid();
    console.log("登陆成功");
    console.log(JSON.stringify({ bdstoken, user, logid }));
    await listandsave(homepath, bdstoken, logid);
    console.log("文件数据库全部建立完成");
    process.exit();
})();
