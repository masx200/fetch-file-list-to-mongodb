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
    console.log("文件数据库全部建立完成");
    process.exit();
})();
