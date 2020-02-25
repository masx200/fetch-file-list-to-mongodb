import mongoose from "mongoose";
const panfileschema = new mongoose.Schema(
    {
        dir: { type: String, unique: true, index: true },
        fs_id: Number,
        isdir: Number,
        md5: { type: String, unique: true, index: true },
        path: { type: String, unique: true, index: true },
        server_filename: String,
        size: Number
    },
    { autoIndex: true }
);
export default panfileschema;
