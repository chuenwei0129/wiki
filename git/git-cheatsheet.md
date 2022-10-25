# Git 高频操作

<!-- git cheat sheet -->
| Command                                   | Action                                                                                                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| git init                                  | 初始化 Git 仓库                                                                                                                                                       |
| git add 文件名                            | 添加文件到暂存区，后面可以跟多个文件，以空格区分                                                                                                                      |
| git add .                                 | 添加当前更改的所有文件到暂存区                                                                                                                                        |
| git commit                                | 提交暂存的更改，会新开编辑器进行编辑                                                                                                                                  |
| git commit -m "关于本次提交的相关说明"    | 提交暂存的更改，并记录下备注                                                                                                                                          |
| git commit -am "关于本次提交的相关说明"   | 等同于 `git add .` && `git commit -m`                                                                                                                                 |
| git status                                | 查看文件状态                                                                                                                                                          |
| git diff                                  | 如果文件改变，比较工作区文件内容修改前后差异                                                                                                                          |
| git diff --staged                         | 比较 stage 的文件的差异，此时文件已经添加到 stage 了                                                                                                                  |
| git log                                   | 显示所有提交过的版本信息，不包括已经被删除的 commit 记录和 reset 的操作                                                                                               |
| git reflog                                | 显示所有的操作记录，包括提交，回退的操作。一般用来找出操作记录中的版本号，进行回退                                                                                    |
| git reset 版本号                          | 软重置，**只删除基于当前版本号之后的 commit 信息**，但相应的文件修改并没有重置                                                                                        |
| git reset --hard 版本号                   | 回退到指定版本，版本号可以通过 `git reflog` 查看                                                                                                                      |
| git reset --hard HEAD^                    | 回退到上一个版本                                                                                                                                                      |
| git reset --hard HEAD~3                   | 回退到上三个版本                                                                                                                                                      |
| git reset --hard origin/master            | 回退到远程仓库的 master 分支最新版本                                                                                                                                  |
| git remote add 远程仓库名 远程仓库地址    | 把本地仓库和远程仓库关联，远程仓库名默认 origin                                                                                                                       |
| git remote -v                             | 查看远程仓库信息                                                                                                                                                      |
| git remote rm 远程仓库名                  | 删除远程仓库                                                                                                                                                          |
| git push -u 远程仓库名 本地分支名         | 把本地分支推送到远程仓库，并且设置默认推送分支，如果当前分支与多个主机存在追踪关系，那么这个时候 `-u` 选项会指定一个默认主机，这样后面就可以不加任何参数使用 git push |
| git push <远程仓库名> --delete 远程分支名 | 删除远程分支                                                                                                                                                          |
| git push 远程仓库名 本地分支名:远程分支名 | 把本地分支推送到远程仓库，并且指定远程仓库的分支名，如果远程分支不存在，则会新建一个远程分支                                                                          |
| git pull 远程仓库名 远程分支名            | 把远程仓库的分支拉取到本地仓库，`git pull` 等同于 `git fetch` && `git merge`                                                                                          |
| git pull 远程仓库名 远程分支名:本地分支名 | 把远程仓库的分支拉取到本地仓库，并且指定本地仓库的分支名                                                                                                              |

<!-- ```js

# 从远程仓库拉取代码并合并到本地，可简写为 
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


| git status                                                     | 查看工作区状态                                   |
| git diff <file>                                                | 查看自己对文件做的修改                           |
| git reset --hard <commit\_id>                                  | 修改文件版本                                     |
| git log                                                        | 查看commit历史                                   |
| git reflog                                                     | 查看命令历史                                     |
| git checkout -- <file>                                         | 撤销工作区的修改                                 |
| git reset HEAD <file>                                          | 撤销缓存区的修改                                 |
| git rm <file> + git commit - m <message>                       | 从版本库中删除文件                               |
| git clone <url>                                                | 将url上的代码仓库clone下来                       |
| git remote add origin git@<server-name>:<path>/<repo-name.git> | 关联一个远程库                                   |
| git remote rm <name>                                           | 和远程库取消关联                                 |
| git push -u origin <name>                                      | 第一次推送分支                                   |
| git push origin <name>                                         | 推送分支                                         |
| git branch                                                     | 查看分支                                         |
| git branch <name>                                              | 创建分支                                         |
| git checkout <name> 或 git switch <name>                       | 切换分支                                         |
| git checkout -b <name> 或 git switch -c <name>                 | 创建 + 切换分支                                  |
| git merge <name>                                               | 合并某分支到当前分支                             |
| git branch -d <name>                                           | 删除合并过的分支                                 |
| git branch -D <name>                                           | 强行删除未被合并过的分支                         |
| git log --graph                                                | 查看分支合并图                                   |
| git merge --no-ff <name>                                       | 不使用fast forward进行合并                       |
| git branch --set-upstream-to <branch-name> origin<branch-name> | 将本地分支和远程分支建立链接                     |
| git remote -v                                                  | 查看远程库信息                                   |
| git pull                                                       | 从远程抓去分支                                   |
| git fetch origin                                               | 获取服务器上的最新版本                           |
| git checkout -b <branch-name> origin/<branch-name>             | 在本地创建和远程分支对应的分支                   |
| git rebase                                                     | 将本地未push的分叉commit历史整理成直线           | -->
