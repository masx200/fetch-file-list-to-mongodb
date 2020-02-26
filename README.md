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

使用浏览器登陆百度网盘的网页版,并登陆

`https://pan.baidu.com/`

然后按`F12`打开浏览器的`devtools`

点击`network`页,选择监视`Doc`类型

然后刷新页面,点击下方的`home`一行,右键选择`copy`,`copy request headers`

获得如下内容

```txt
GET /disk/home HTTP/1.1
Host: pan.baidu.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
Sec-Fetch-Dest: document
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Referer: https://pan.baidu.com/disk/home?
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BAIDUID=xxx; pan_login_way=xxx; PANWEB=xxx; BIDUPSID=xxx; PSTM=xxx; cflag=xxx; BDCLND=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx

```

提取出其中`Cookie:`后的内容为 cookie

![./sshot-2020-02-26-[13-50-52].png](https://raw.githubusercontent.com/masx200/fetch-pan-file-list-mongodb/master/sshot-2020-02-26-%5B13-50-52%5D.png)

# 使用前先保存 cookie,并解析 cookie

```shell
yarn run save-cookie "BAIDUID=xxx; BIDUPSID=xxx; PSTM=xxx; PANWEB=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; cflag=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx"
```

```shell
yarn run parse-cookie
```
