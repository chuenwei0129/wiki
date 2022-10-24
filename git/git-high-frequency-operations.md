# Git 高频操作

```js
// 初始化一个仓库
git init
// 添加文件到暂存区，后面可以跟多个文件，以空格区分
git add [文件名]
# 添加当前更改的所有文件到暂存区
git add .
# 提交暂存的更改，会新开编辑器进行编辑
git commit
# 提交暂存的更改，并记录下备注
git commit -m [关于本次提交的相关说明]
# 等同于 git add . && git commit -m
git commit -am [关于本次提交的相关说明]
# 查看文件状态
git status
# 如果文件改变，比较工作区两个文件内容
git diff
# 比较 stage 的文件的差异，此时文件已经添加到 stage 了
git diff --staged
# 显示所有提交过的版本信息，不包括已经被删除的 commit 记录和 reset 的操作
git log
# 显示所有的操作记录，包括提交，回退的操作。一般用来找出操作记录中的版本号，进行回退
git reflog
# 软重置，只会删除基于当前 commit id 之后的 commit 信息，但相应的文件修改并没有重置
git reset [commit id]
# 回到 commit id 对应的版本
git reset --hard [commit id]
# 返回到前 N 个版本
git reset --hard head~[N]
# 返回到上一个 commit
git reset --hard head^
# 把本地仓库和远程仓库关联
git remote add [远程仓库名] [远程仓库地址]
# 删除远程仓库
git remote rm [远程仓库名]
# 查看远程仓储名称
git remote -v
# 从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge
git pull <远程主机名> <远程分支名>:<本地分支名>
# 获取远程仓库特定分支的本地备份更新
git fetch <远程主机名> <分支名>
# 当你想将某个远程分支的内容取回到本地下某个分支的话
git fetch origin <branch-name>:<local-branch-name>
# 获取远程仓库所有分支的更新
git fetch --all
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看本地和远程分支
git branch -a
# 创建并切换到新建分支
git checkout -b <branch-name>
# 创建并切换到指定分支（ -C 大小写皆可）
git switch -C <new-branch>
# 从当前分支，切换到其他分支
git switch <branch-name>
# 与 switch 命令相同
git checkout <branch-name>
# 删除分支
git branch -d <branch-name>
# 删除远程分支
git push origin -d <branch-name>
# 当前分支与指定分支合并
git merge <branch-name>
# 查看哪些分支已经合并到当前分支
git branch --merged
# 重命名分支
git branch -m <old-branch-name> <new-branch-name>
# 如果当前分支与多个主机存在追踪关系，那么这个时候 -u 选项会指定一个默认主机，这样后面就可以不加任何参数使用 git push
git push -u origin main
# 如果当前分支只有一个追踪分支，那么主机名都可以省略
git push
# 将当前分支推送到 origin 主机的对应分支，如果上游没有就会新建分支
git push origin develop
# 删除远程分支
git push origin -d <branch-name>
# 结果类似于 git reset --hard <commit-id> 但是它不会重置提交历史，而是对此操作重新 commit 一个消息，对 revert 对应的 commit-id 重新 revert 会回到没有 revert 的状态
git revert <commit-id>
```
