import mongoose from "mongoose";
export type PANFILE = {
    // category: number;
    fs_id: number;
    isdir: 0;
    // local_ctime: number;
    // local_mtime: number;
    md5: string;
    // oper_id: number;
    path: string;
    // server_ctime: number;
    server_filename: string;
    // server_mtime: number;
    // share: number;
    size: number;
    // unlist: number;
};

const panfileschema = new mongoose.Schema<PANFILE>(
    {
        /* 添加目录路径dir属性 */
        dir: { type: String, unique: true, index: true /* , index: true  */ },
        // category: Number,
        fs_id: Number,
        isdir: Number,
        // local_ctime: Number,
        // local_mtime: Number,
        md5: { type: String, unique: true, index: true /* , index: true */ },
        // oper_id: Number,
        path: { type: String, unique: true, index: true },
        // server_ctime: Number,
        server_filename: String,
        // server_mtime: Number,
        // share: Number,
        size: Number
        // unlist: Number
    },
    { autoIndex: true }
);
/* category: 6
fs_id: 687167496437996
isdir: 0
local_ctime: 1508856247
local_mtime: 1508856247
md5: "ffd7840449f1b71830bfdf8174dcbe87"
oper_id: 1157661021
path: "/红米note3-系统数据+悬浮菜单备份-20171024-MIUI.zip"
server_ctime: 1508859401
server_filename: "红米note3-系统数据+悬浮菜单备份-20171024-MIUI.zip"
server_mtime: 1508859401
share: 0
size: 65053459
unlist: 0 */
export default panfileschema;