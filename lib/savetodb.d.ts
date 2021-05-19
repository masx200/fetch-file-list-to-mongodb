import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
export declare function savetodb(
    fileslist: Array<PANFILE | PANDIR>
): Promise<void>;
