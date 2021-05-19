import mongoose from "mongoose";
export declare type PANDIR = {
    dir_empty: number;
    empty: number;
    category: number;
    fs_id: number;
    isdir: 1;
    local_ctime: number;
    local_mtime: number;
    oper_id: number;
    path: string;
    server_ctime: number;
    server_filename: string;
    server_mtime: number;
    share: number;
    size: number;
    unlist: number;
};
declare const panfileschema: mongoose.Schema<
    mongoose.Document<any, any>,
    mongoose.Model<any, any, any>,
    undefined
>;
export default panfileschema;
