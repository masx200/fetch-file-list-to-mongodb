import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
export default function savetodb(
    fileslist: Array<PANFILE | PANDIR>
): Promise<void>;
