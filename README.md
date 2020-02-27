# fetch-file-list-to-mongodb


这个代码库是`百度网盘批量清理重复文件计划`的一部分。

批量获取百度网盘所有文件信息保存到 `MongoDB` 数据库的脚本

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
