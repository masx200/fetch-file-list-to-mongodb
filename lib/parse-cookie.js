import cookie from "cookie";
import fsextra from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { jsonfile } from "./files.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const txtfile = path.join(__dirname, "./cookies.txt");
(async () => {
    const buf = await fsextra.readFile(txtfile);
    const cookiestr = buf.toString();
    console.log(cookiestr);
    const parsedobj = cookie.parse(cookiestr, {});
    console.log(parsedobj);
    await fsextra.writeJSON(jsonfile, parsedobj, { spaces: 4 });
})();