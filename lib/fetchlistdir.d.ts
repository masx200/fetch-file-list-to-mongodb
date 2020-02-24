import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
export declare function listonedir(dir: string, bdstoken: string, logid: string): Promise<Array<PANFILE | PANDIR>>;
