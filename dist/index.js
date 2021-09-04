import process from "process";

import mongoose from "mongoose";

import currentlimiter from "@masx200/async-task-current-limiter";

import { listonedir } from "@masx200/fetch-baidu-pan-files-api";

import { posix } from "path";

const panfileschema = new mongoose.Schema({
    dir: {
        type: String,
        index: !0
    },
    fs_id: Number,
    isdir: Number,
    md5: {
        type: String,
        index: !0
    },
    path: {
        type: String,
        unique: !0,
        index: !0
    },
    server_filename: {
        type: String,
        index: !0
    },
    size: Number
}, {
    autoIndex: !0
});

var opts_mongourl = "mongodb://127.0.0.1:27017", opts_db = "baidupan", opts_collect = "panfile";

const panFilecollect = mongoose.model(opts_collect, panfileschema, opts_collect);

panFilecollect.createIndexes().then((() => {
    console.log("索引建立成功");
}));

const mapfileobjdir = obj => ({
    ...obj,
    dir: posix.dirname(obj.path)
});

async function listandsaveall(dir) {
    const dirslist = await limitedlistandsavesingle(dir);
    await async function(dirslist) {
        if (!dirslist.length) return;
        console.log(dirslist);
        const listarrs = function(data, count) {
            count = Math.max(1, count);
            for (var result = [], i = 0; i < data.length; i += count) result.push(data.slice(i, i + count));
            return result;
        }(dirslist, Math.max(1, Math.round(dirslist.length / 4)));
        await Promise.all(listarrs.map((dir => async function(dirslist) {
            if (!dirslist.length) return;
            console.log(dirslist);
            for (let folder of dirslist) await listandsaveall(folder);
        }(dir))));
    }(dirslist);
}

const limitedlistandsavesingle = currentlimiter(8).asyncwrap((async function(dir) {
    const fileslist = await listonedir(dir);
    console.log("successfully fetch file list ", dir);
    const savepro = async function(fileslist) {
        const filetosave = fileslist.filter((fileobj => !fileobj.isdir)).map(mapfileobjdir);
        for (let obj of filetosave) console.log("正在保存到file数据库", obj.path), await panFilecollect.updateMany({
            path: obj.path
        }, obj, {
            upsert: !0
        }).exec(), console.log("成功保存到file数据库", obj.path);
    }(fileslist).then((() => {
        console.log("successfully save data to db ", dir);
    }));
    await savepro;
    return fileslist.filter((fileobj => fileobj.isdir)).map((obj => obj.path));
}));

async function start() {
    const connection = mongoose.connect(opts_mongourl, {
        maxPoolSize: 10,
        autoIndex: !0,
        autoCreate: !0,
        dbName: opts_db
    });
    await connection.then((() => {
        console.log("mongodb conneted");
    })), console.log("数据库登陆成功"), await listandsaveall("/"), console.log("文件数据库全部建立完成"), 
    process.exit();
}

process.on("unhandledRejection", (err => {
    throw err;
}));

export { start };
//# sourceMappingURL=index.js.map
