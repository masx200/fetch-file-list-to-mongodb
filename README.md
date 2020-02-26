# fetch-pan-files-mongodb

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

# 使用前先获取 cookie

登陆百度网盘的网页版

`https://pan.baidu.com/`

# 使用前先保存 cookie

```shell
yarn run save-cookie "BAIDUID=xxx; BIDUPSID=xxx; PSTM=xxx; PANWEB=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; cflag=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx"
```
