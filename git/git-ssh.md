# Git 配置 SSH

虽然 Git 可以工作在 ssh 与 https 两种协议上，但为了安全性，更多时候会选择 ssh。

## 生成一个 ssh-key

执行命令

```sh
ssh-keygen -t rsa -C "example@qq.mail"
```

- `-t`: 可选择 dsa | ecdsa | ed25519 | rsa | rsa1，代表加密方式
- `-C`: 注释，一般写自己的邮箱

如果执行成功，切换到 `~/.ssh` 目录下，此时目录应该如下所示。

```sh
authorized_keys config id_rsa id_rsa.pub known_hosts
```

> id_rsa / id_rsa.pub: 配对的私钥与公钥

## 复制 `id_rsa.pub` 的内容

以 Github 为例，进入 `settings -> SSH and GPG keys` 通过 `cat` 命令查看文件 `id_rsa.pub` 的内容，然后复制过来，点击 `add ssh key`，这一步等于说把你的公钥放到了 Github 上进行托管。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/-k3u1fbpfcp.webp)

## 全局配置 Git 的用户名和邮箱

```sh
git config --global user.name "xxx"
git config --global user.email "xxx@xx.com"
```

完成以上步骤，就可以愉快 pull 代码开发了。

> 和 https 拉取方式不同的是，https 方式需要每次提交前都手动输入用户名和密码，ssh 的方式配置完毕后 Git 都会使用你本地的私钥和远程仓库的公钥进行验证是否是一对秘钥，从而简化了操作流程。

## No.1 的小秘籍

### 查看是否有权限

```sh
# -v 详细展示链接过程
ssh -T git@github.com
# Hi chuenwei0129! You've successfully authenticated, but GitHub does not provide shell access.
```

### 代理问题

```sh
# 这个提示是主要提示是不允许你代理这个 ip 登录 ssh
kex_exchange_identification: Connection closed by remote host
Connection closed by 127.0.0.1 port 7890
```

解决方案就是用 Github 的 443 端口 <https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port> 或者把代理关了

更多讨论：[ssh远程登陆有时候正常，有时候显示：ssh_exchange_identification: Connection closed by remote host，这是什么原因？](https://www.zhihu.com/question/20023544)
