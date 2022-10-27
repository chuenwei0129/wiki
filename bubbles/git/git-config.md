# git config

## 常规操作

```js
// 列出当前配置
git config --list
// 列出本地 Repository 配置
git config --local --list
// 列出全局配置
git config --global --list
// 列出系统配置
git config --system --list
```

## 把 Git 的默认分支 master 修改成 main

### 把默认分支改为 main

```sh
git config --global init.defaultBranch main
```

#### 修改已创建项目的主分支为 main

```js
// 把当前 master 分支改名为 main, 其中 -M 的意思是移动或者重命名当前分支
git branch -M main
```

## 配置 Git 的默认编辑器为 VSCode

> [[vscode-git-default-editor]]
