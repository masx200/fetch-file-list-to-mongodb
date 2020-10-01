import mongoose from "mongoose";
import schemafile from "./schemafile.js";
export const panFilecollect = mongoose.model("panfile", schemafile, "panfile");
panFilecollect.createIndexes().then(() => {
    console.log("索引建立成功");
});
