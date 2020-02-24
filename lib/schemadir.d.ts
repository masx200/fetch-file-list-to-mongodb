import mongoose from "mongoose";
export declare type PANDIR = {
    dir_empty: number;
    empty: number;
    fs_id: number;
    isdir: 1;
    path: string;
    server_filename: string;
    size: number;
};
declare const panfileschema: mongoose.Schema<PANDIR>;
export default panfileschema;
