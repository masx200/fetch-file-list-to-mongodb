# fetch-pan-files-mongodb

获取百度网盘所有文件信息保存到 `MongoDB` 数据库的脚本

# 使用方法

安装 `node_modules`

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

# 使用前先登陆,保存 cookie

```shell
yarn run save-cookie "BAIDUID=xxx; BIDUPSID=xxx; PSTM=xxx; PANWEB=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; cflag=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx"
```
