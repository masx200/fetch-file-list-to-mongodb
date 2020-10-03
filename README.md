# fetch-file-list-to-mongodb

这个代码库是`百度网盘批量清理重复文件计划`的一部分。

批量获取百度网盘所有文件信息保存到 `MongoDB` 数据库的脚本

保存数据到数据库的位置

"dbname" 是'baidupan'

"collection" 是"panfile"

百度网盘批量清理重复文件计划

https://github.com/masx200/baidu-pan-delete-repeated-files

https://github.com/masx200/fetch-baidu-pan-files

https://github.com/masx200/fetch-file-list-to-mongodb

https://github.com/masx200/mongodb-file-find-md5-repeat

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

# 清除数据库的百度网盘文件信息

```shell
mongo  mongodb://127.0.0.1:27017/baidupan ./mongo/clean.js
```

# 命令行示例

可选参数 `db`:本地数据库的名称 `string`

可选参数 `collect`:数据库中集合的名称 `string`

可选参数 `mongourl`：mongodb 数据库的 URL

例如： "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"

```shell
fetch-file-list-to-mongodb --db=baidupan  --collect=panfile --mongourl=mongodb://127.0.0.1:27017

```
