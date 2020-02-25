import cookie from "cookie";
import fsextra from "fs-extra";
// const jsonfile = "./cookies.json";
import { jsonfile, txtfile } from "./files.js";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//const txtfile = path.join(__dirname, "./cookies.txt");
(async () => {
    const buf = await fsextra.readFile(txtfile);
    const cookiestr = buf.toString();
    console.log(cookiestr);
    const parsedobj = cookie.parse(cookiestr, {});
    console.log(parsedobj);
    await fsextra.writeJSON(jsonfile, parsedobj, { spaces: 4 });
})();
