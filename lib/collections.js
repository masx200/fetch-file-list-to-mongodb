import mongoose from "mongoose";
import schemafile from "./schemafile.js";
import opts from "./opts.js";
export const panFilecollect = mongoose.model(
    opts.collect,
    schemafile,
    opts.collect
);
panFilecollect.createIndexes().then(() => {
    console.log("索引建立成功");
});
