# 最傻逼的用户，被 macOS 百般折磨后，努力至今终尝回报，突然得到了最强使用技巧

## 给 Mac 硬件做健康检查

在使用 Mac 电脑的过程中，如果认为 Mac 可能存在硬件问题，[可以使用“Apple 诊断”来帮助确定可能存在故障的硬件组件](https://support.apple.com/zh-cn/HT202731)。

## 给 m1 芯片 Mac 重装系统

查阅：[[mac-reinstall]]

## macOS 中“安全性与隐私”没有允许任何来源

为了安全，macOS 新版本已经默认屏蔽未知开发者选项，需要用命令手动开启

```sh
sudo spctl --master-disable
```

如果以后想撤消它，则可以返回 Terminal 并运行以下命令：

```sh
sudo spctl --master-enable
```

## 代理

查阅：[[gfw]]

## Homebrew 包管理

查阅：[[mac-brew]]

## m1 查询硬盘写入

### 安装 smartctl

在终端中输入如下代码，即可进行安装：

```sh
brew install smartmontools
```

### 查看硬盘使用量

在终端中输入如下代码，即可进行看查硬盘使用量。

```sh
smartctl -a disk0
```

结果如下，里面的 `Percentage Used` 就是损耗值，`Data Units Written` 就是写入量。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/SCR-20220328-wth.png)

## 用自带工具快速判断 macOS 的网络质量

在打开的终端窗口中，输入 `networkQuality`（注意大小写），然后回车。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/network.png)

「responsiveness」，是指上传和下载的综合「响应能力」，根据 Apple 的[支持文档](https://support.apple.com/zh-cn/HT212313)，它的衡量指标是每分钟往返次数 (RPM)，即在正常工作条件下，网络能够在一分钟内完成的连续往返次数或事务数量。

根据 RPM 的高低数值不同，`networkQuality` 对响应能力的评价也分为「低」「中」「高」三个等级。这可以大致反映当前网络的拥堵程度，从而帮助间接估测视频通话、游戏等应用的效果：

- 评价为「Low」（低），说明同一网络的设备会互相影响，导致其他设备的网络连接不可靠；
- 评价为「Medium」（中），则表明多设备共享网络时会造成短暂卡顿；
- 评价为「High」（高）则最为理想，表明网络通畅，多设备并行联网也能和平共处，保持良好连通。

此外，`networkQuality` 命令可以接受一些参数。

- `-c` 会输出 json 格式的测速详情；
- `-s` 会分开测试下载和上传，而非像默认那样对两者同时测试（同时测试更能反映通话等真实应用的场景）；
- `-I` 可以测试特定网络接口的速度，例如，命令 `networkQuality -I en0` 是指测试内建 Wi-Fi 网络的速度。

更多参数和说明，可以用如下命令查阅手册页面 `networkQuality(8)`：`man networkQuality`

## 更改启动台应用程序显示数目

默认情况下，启动台应用的显示数目为每行 7 个图标，总共有 5 行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/launchpad.jpeg)

我们可以通过命令行的方式对显示效果进行更改。

> 操作步骤：
>
> 打开「应用程序」-\>「实用工具」-\>「终端」，输入下面的命令，点击回车。

- 更改每行显示应用程序的个数的命令：

  ```sh
  defaults write com.apple.dock springboard-columns -int 5
  ```

- 更改应用程序总共显示的行数的命令：

  ```sh
  defaults write com.apple.dock springboard-rows -int 3
  ```

最后，更改完成之后，还需要重启「启动台（Launchpad）」来应用更改。

> **注意：**
>
> **在重新启动「启动台（Launchpad）」之后，所有的应用程序图标排列方式都会被重置，包括文件夹显示，图标排列顺序等等。请慎重操作。**

- 更改设置，重启启动台的命令：

  ```sh
  defaults write com.apple.dock ResetLaunchPad -bool TRUE; killall Dock
  ```

## Mac 下显示 / 隐藏文件

同 Windows 一样，macOS 会将重要文件隐藏起来，以防止意外删除这些文件而损坏系统。但是，有时候我们需要显示隐藏文件。则需要使用如下方法。

打开「启动台」，选择「终端」软件，输入以下命令，显示隐藏文件：

```sh
defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
```

如果需要不显示隐藏文件，则执行下面的命令：

```sh
defaults write com.apple.finder AppleShowAllFiles No && killall Finder
```

> [macOS defaults](https://macOS-defaults.com/dock/tilesize.html#set-to-48-default-value)

## macOS DMG 安装后无法打开，提示损坏

网络下载应用被 Apple 添加隔离标识，终端输入命令解除即可：

```sh
# sudo xattr -r -d com.apple.quarantine
sudo xattr -r -d com.apple.quarantine <应用路径>

# 比如我装 m1 版本的语雀
sudo xattr -rd com.apple.quarantine /Applications/语雀.app
```

## macOS 软件清单

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/casks.png)

|                           软件                            |                                                  功能简述                                                  |                       相关                       |
| :-------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------: |
|          [bob](https://github.com/ripperhe/Bob)           |                       一款 Mac 端翻译软件，支持划词翻译、截图翻译以及手动输入翻译。                        |      [#](https://ripperhe.gitee.io/bob/#/)       |
|           [iina](https://github.com/iina/iina)            |                                            体验最佳的视频播放器                                            |
|     [keycastr](https://github.com/keycastr/keycastr)      |                                    录屏好帮手，实时显示按键操作的小工具                                    |
|     [neteasemusic](https://music.163.com/#/download)      |                                   网易云音乐，网易公司推出的网络音乐软件                                   |
|    [telegram-desktop](https://telegram.org/?setln=en)     |                                            跨平台的即时通信软件                                            |
|  [cheatsheet](https://www.mediaatelier.com/CheatSheet/)   |                                             快速查看快捷键列表                                             |
|     [istat-menus](https://bjango.com/mac/istatmenus/)     |            电脑硬件信息监控软件，实时监控 CPU、GPU、内存、硬盘、网络、温度、电池以及系统时间。             |   [#](https://www.jianshu.com/p/1345a10331cb)    |
|       [lyricsx](https://github.com/ddddxxx/LyricsX)       |                                             功能完备的歌词工具                                             |
|            [raycast](https://www.raycast.com/)            |                   效率神器。应用与文件搜索、剪贴板管理、快捷短语输入，丰富全面的插件功能                   | [#](https://www.youtube.com/watch?v=KL0unqxkcDA) |
|          [thor](https://github.com/gbammc/Thor)           |         Mac 应用程序开启 /切换工具，通过它，给应用程序设定快捷键，即可使用快捷键迅速打开或切换应用         |
| [google-chrome](https://www.google.cn/intl/zh-CN/chrome/) |                                       谷歌浏览器，基于 Chromium 内核                                       |
|               [iterm2](https://iterm2.com/)               |                           专为 macOS 用户打造的命令行应用。可替代原生的 Terminal                           | [#](https://juejin.cn/post/6917659162025394183)  |
|         [maccy](https://github.com/p0deje/Maccy)          |                                           轻量级的剪贴板管理工具                                           |
|    [rectangle](https://github.com/rxhanson/Rectangle)     |     开源的窗口管理器，基于 Spectacle 应用，用 Swift 语言编写，让用户使用键盘快捷键来移动和调整窗口大小     |
|   [visual-studio-code](https://code.visualstudio.com/)    | 微软公司出品的一个运行于 Mac OSX、Windows 和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器 |
|     [hiddenbar](https://github.com/dwarvesf/hidden/)      |                                               菜单栏管理工具                                               |
|           [keka](https://github.com/aonez/Keka)           |                                            简单好用的解压缩工具                                            |
|       [motrix](https://github.com/agalwood/Motrix)        |                       全能的下载工具，支持下载 HTTP、FTP、BT、磁力链、百度网盘等资源                       |
|               [shottr](https://shottr.cc/)                |         方便好用的截图工具。功能包括：窗口截图 / 滚动截图 / 取色器功能 / 贴图功能 / 丰富的标注功能         |        [#](https://sspai.com/post/71485)         |
|      [wechat](https://mac.weixin.qq.com/?lang=zh_CN)      |                                             Mac 下微信客户端。                                             |
|       [picgo](https://github.com/Molunerfinn/PicGo)       |                                                图床管理工具                                                | [#](https://picgo.github.io/PicGo-Doc/zh/guide/) |
|         [squirrel](https://github.com/ssnhd/rime)         |                                                   输入法                                                   |     [#](https://ssnhd.com/2022/01/06/rime/)      |

## [浏览器](#目录)

### 管理书签

> [高效书签管理，我是如何管理 5000 条书签的](https://www.runningcheese.com/bm)

### 为 Chrome 设置搜索引擎关键词

`Chrome` 的搜索栏同时支持多种搜索：

1. 进入设置搜索引擎的界面：为百度搜索设置 关键字 `bd`

2. 搜索成功! 在地址栏输入关键词 `bd` 后, 按空格键, 就可以快速切换到百度搜索了

### 浏览器插件

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/mac/plug.png)

### 油猴脚本

> 使用自定义网站脚本的插件，可以使用各种 **user.js** 脚本，相当于小型的插件管理器，下面是我常用的脚本，其他用途的脚本请自行探索 [Greasy Fork](https://greasyfork.org/zh-CN)、[Sleazy Fork](https://sleazyfork.org/zh-CN)、[OpenUserJS](https://openuserjs.org/)

- [计时器掌控者](https://timer.palerock.cn/)：视频广告跳过 | 视频广告加速器

- [文本选中复制](https://github.com/WindrunnerMax/TKScript)：解除网站不允许复制的限制，文本选中后点击复制按钮即可复制

- ~~[拒绝二维码登陆](https://greasyfork.org/zh-CN/scripts/27183-%E6%8B%92%E7%BB%9D%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%99%BB%E5%BD%95-%E6%B7%98%E5%AE%9D-%E4%BA%AC%E4%B8%9C%E7%AD%89%E7%BD%91%E7%AB%99%E9%BB%98%E8%AE%A4%E5%87%BA%E7%8E%B0%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2)：淘宝、京东、阿里云等网站默认使用账号密码登录，不出现二维码登录界面~~

- [解除 B 站区域限制](https://greasyfork.org/zh-CN/scripts/25718-%E8%A7%A3%E9%99%A4b%E7%AB%99%E5%8C%BA%E5%9F%9F%E9%99%90%E5%88%B6)：解除 `B` 站 区域限制; 只对 `HTML5` 播放器生效

## [有用的链接](#目录)

- <https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md>

[//begin]: # "Autogenerated link references for markdown compatibility"
[mac-reinstall]: ../bubbles/mac/mac-reinstall.md "给 m1 芯片 Mac 重装系统"
[gfw]: gfw.md "越过长城，走向世界"
[mac-brew]: ../bubbles/mac/mac-brew.md "Homebrew 包管理工具"
[//end]: # "Autogenerated link references"
