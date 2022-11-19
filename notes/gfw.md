# 越过长城，走向世界

## 🐱 Clash

- [Clash](https://github.com/Dreamacro/clash)：一个 Go 语言开发的多平台代理客户端
- [ClashX](https://github.com/yichengchen/clashX)：Clash 的一个简单轻量化的代理客户端
- [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg)：Clash 的 Windows/macOS [跨平台可定制化的图形客户端](https://docs.cfw.lbyczf.com/)

## ✈️ 机场

- **正在使用：** [🏆 Flyint 飞数](https://www.flyint.cc/)
- **一元备用：** [🌍 XFLTD 养鸡场](https://xfltd.org/)
- **免费机场：** [免费节点及订阅地址](https://github.com/Pawdroid/Free-servers)
- **寻找机场：** [DuyaoSS - 机场测速和简介](https://www.duyaoss.com/archives/3/)

## 💻 Terminal

### 配置终端代理

通过设置 http_proxy、https_proxy、all_proxy，可以让终端走指定的代理。

```perl
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

> 7890 是 http 代理对应的端口，根据实际情况修改。

这里提供一个便捷脚本，里面包含打开、关闭功能：

```perl
function po() {
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=$http_proxy
    export all_proxy=socks5://127.0.0.1:7890
    echo -e "终端代理已开启!"
}

function pf(){
    unset http_proxy https_proxy all_proxy
    echo -e "终端代理已关闭!"
}
```

通过 `po` 启动代理，`pf` 关闭代理。

接下来需要把脚本写入 `.zshrc`，`source ~/.zshrc` 就可以永久生效。

可以执行 `curl ipinfo.io` 查看代理 ip。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/ip.png)

### 其他代理设置

#### git

```perl
# 设置
git config --global http.proxy 'socks5://127.0.0.1:7890'
git config --global https.proxy 'socks5://127.0.0.1:7890'
# 恢复
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### git clone ssh 如何走代理

打开 `~/.ssh/config`，如果没有这个文件，自己手动创建。

```perl
# 全局
# ProxyCommand nc -X 5 -x 127.0.0.1:1080 %h %p
# 只为特定域名设定
Host github.com
    ProxyCommand nc -X 5 -x 127.0.0.1:7890 %h %p
```

#### npm

```perl
# 设置
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
# 恢复
npm config delete proxy
npm config delete https-proxy
```

#### 拓展：Socks5 代理协议

1. Socks5 是一个代理协议，它在使用 TCP/IP 协议通讯的前端机器和服务器机器之间扮演一个中介角色，使得内部网中的前端机器变得能够访问 Internet 网中的服务器，或者使通讯更加安全。

2. Socks5 代理工作在会话层，不要求应用程序遵循特定的操作系统平台，Socks5 代理只是简单地传递数据包，而不必关心是何种应用协议（比如 FTP、HTTP 和 NNTP 请求）。

3. Socks5 包含 https，https 又包含 http，Socks5 代理工作在 osi 七层模型中的会话层（第五层），https/http 代理工作在 osi 七层模型的应用层（第七层），所以说 Socks 代理更加底层。

## ❓ 一些问题

Arc 浏览器在注册的时候遇到 「Unknown server error」 的错误

![20221028151344](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221028151344.png)

原因是网络无法访问 Arc 的服务，这个问题我在之前 Warp 终端的时候也遇到了，现在出现的这些产品都喜欢在开篇的时候让用户注册账号使用，但是在国内的这种网络环境下就会遇到各种奇葩的问题。

**解决办法：**

![20221117135416](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/20221117135416.png)

```perl
# 终端打开代理
# 命令行运行 warp
/Applications/Warp.app/Contents/macOS/stable
```
