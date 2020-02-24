import mongoose from "mongoose";
export declare type PANFILE = {
    fs_id: number;
    isdir: 0;
    md5: string;
    path: string;
    server_filename: string;
    size: number;
};
declare const panfileschema: mongoose.Schema<PANFILE>;
export default panfileschema;
