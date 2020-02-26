# fetch-pan-files-mongodb

批量获取百度网盘所有文件信息保存到 `MongoDB` 数据库的脚本

获取目录的文件信息,模拟浏览器的脚本操作来发送网络请求

还提供了直接获取指定目录下的所有文件信息的功能,若遇到网络错误自动重试

还提供了直接删除指定的批量文件的功能,多次尝试,判断要删除的文件是否存在

网盘对于每次删除操作的文件数有限制,故只能拆分多次尝试删除

# 使用方法

## 安装 `node_modules`

```shell
yarn install
```

## 编译脚本

```shell
yarn build
```

## 运行脚本

```shell
yarn start
```

# 使用前需要 `MongoDB`

安装 `MongoDB`到电脑上

```shell
sudo apt install mongodb
```

启动`MongoDB` 服务

```shell
mongod --dbpath /path/to/your/db
```

# 使用前先获取 `cookie`

使用浏览器登陆百度网盘的网页版,并登陆

`https://pan.baidu.com/`

然后按`F12`打开浏览器的`devtools`

点击`network`页,选择监视`Doc`类型

然后刷新页面,点击下方的`home`一行,右键选择`copy`,`copy request headers`

获得如下内容

```txt
GET /disk/home HTTP/1.1

Cookie: BAIDUID=xxx; pan_login_way=xxx; PANWEB=xxx; BIDUPSID=xxx; PSTM=xxx; cflag=xxx; BDCLND=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx

```

提取出其中`Cookie:`后的内容为 `cookie`

![./sshot-2020-02-26-[13-50-52].png](https://raw.githubusercontent.com/masx200/fetch-pan-file-list-mongodb/master/sshot-2020-02-26-%5B13-50-52%5D.png)

# 使用前先保存 `cookie`,并解析 `cookie`

```shell
yarn run save-cookie "BAIDUID=xxx; BIDUPSID=xxx; PSTM=xxx; PANWEB=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; cflag=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx"
```

```shell
yarn run parse-cookie
```

# 直接获取指定目录下的文件信息,若遇到网络错误自动重试

```js
import { listonedir } from "./lib/fetchlistdir.js";
listonedir("/path/to/your/dir").then(console.log);
```

# 直接删除指定的批量文件,多次尝试,判断要删除的文件是否存在

```js
import { deletefiles } from "./lib/fetch-delete-files.js";
deletefiles(["/path/to/your/file1", "/path/to/your/file2"]).then(console.log);
```
