# 怕遗忘 Git 的我，把相关知识点都记录下来就对了<!-- omit in toc -->

## Git 配置 SSH

> [[git-ssh]]

## Git 的工作区域

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/613861755_1618028580119_014AA794B8DE2B0593F9F6C4BE7243D9.png)

- **Workspace**：工作区，就是平时进行开发改动的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作。

  > Git 可以把工作区中的文件处理、压缩成一个提交对象，也能将取得的提交对象解包成文件同步到工作区中。

- **Stage / Index**：暂存区，当执行 `git add` 的命令后，工作区的文件就会被移入暂存区，暂存区标记了当前工作区中那些内容是被 Git 管理的，当完成某个需求或者功能后需要提交代码，第一步就是通过 `git add` 先提交到暂存区。

  > Git 把它作为工作区与提交历史之间的中间区域，方便我们对提交内容进行组织：我们可能会在工作区同时更改多个完全不相干的文件，这时可以将它们分别放入暂存区，并在不同的提交中加入提交历史。此外暂存区还用于合并冲突时存放文件的不同版本。
  >
  > 除非是一个刚刚初始化的 Git 仓库，否则暂存区并不是空的，它会填充最近一次提交所对应的文件快照，因此当我们基于最近一次提交在工作区做了一些修改之后，git status 会将工作区的文件与暂存区的文件快照进行对比， 并提示我们有哪些做了修改的文件尚未加入暂存区。

- **Repository**：本地仓库，位于自己的电脑上，通过 `git commit` 提交暂存区的内容，会进入本地仓库。

- **Remote**：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 `git push` 命令同步代码到远程仓库。

## Index 文件

暂存区并不像工作区有可见的文件系统目录，或者像提交历史一样通过 `.git/objects` 目录保存着所有提交对象，它没有实际存在的目录或文件夹，它的实体是位于 .git 目录的 index 文件。 index 是一个二进制文件，包含着一个由路径名称、权限和 blob 对象的 SHA-1 值组成的有序列表。

我们可以通过 `git ls-files` 命令查看 index 中的内容：

```sh
git ls-files --stage
```

```sh
100644 67045665db202cf951f839a5f3e73efdcfd45021 0 .gitignore
100644 fdddb29aa445bf3d6a5d843d6dd77e10a9f99657 0 LICENSE
100644 da4a4b16b47061a625e8b977a1d7a490982ff75e 0 README.md
100644 984d0d5b2df5ecbb33a45fa601c6750b445a3385 0 index.js
```

index 中记录了暂存区文件的路径名称和 SHA-1 ID，文件内容已经作为 blob 对象保存到了 .git/objects 目录中：

```sh
tree .git/objects -L 2
```

```sh
.git/objects
├── 09
│   └── 8749da09bbdb571aa42c4f2c5162aaf3249161
├── 0a
│   └── 90005e3d4013c11f5c3b24124badec7da55fcf

......................

├── fd
│   └── ddb29aa445bf3d6a5d843d6dd77e10a9f99657
├── info
└── pack

31 directories, 32 files
```

blob 对象是 Git 用来保存文件数据的二进制对象，我们可以通过 ID 取得对应的 blob 对象，用 `git cat-file` 命令打印其内容：

```sh
git cat-file -p 984d0d5b2df5ecbb33a45fa601c6750b445a3385
```

输出 index.js 内容：

```js
console.log('Hello World')
```

当我们将一个修改过的文件加入暂存区后，如果又在工作区对文件进行了新的修改，需要重新将其加入暂存区，因为暂存区以 blob 对象保存的只是文件加入时的内容。

**在 index 文件中，还记录了每一个文件的创建时间和最后修改时间等元信息，它通过引用实际的数据对象包含了一份完整的文件快照，因此可以通过对比 SHA-1 校验和实现与工作区文件之间的快速比较。**

## [提交历史](#目录)

提交历史是工作区文件在不同时间的文件快照（快照即文件或文件夹在特定时间点的状态，包括内容和元信息）。

我们可以通过 `git log` 命令查看当前分支的提交历史

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220402-pld.png)

Git 通过「提交对象」来储存每一次提交。这个 ID 是以对象内容进行 SHA-1 计算得到的哈希值，不同的内容一定会得到不同的结果，**Git 既把它作为每一个对象（不仅仅是提交对象）的唯一标识符，也用作 `.git/objects` 目录中的地址（其中存储着实际的二进制文件）**，我们可以用 ID 找到对应的对象并打印其内容：

```sh
git cat-file -p 50fd80a
```

```sh
tree 0a90005e3d4013c11f5c3b24124badec7da55fcf
parent 8f23070fc78bf1b8a081c0b28beac3e7f3f9f019
author chuenwei0129 <chuenwei0129@gmail.com> 1648891715 +0800
committer chuenwei0129 <chuenwei0129@gmail.com> 1648891715 +0800

revert 第一次提交
```

这个提交对象的内容包含三部分：

- 对应的 tree 对象的 ID
- 父提交对象的 ID
- 作者、提交者及提交信息等元信息

tree 对象主要由其他 tree 对象和 blob 对象的 ID 以及路径名称组成：

```sh
git ls-tree 0a90005e3d4013c11f5c3b24124badec7da55fcf
```

```sh
100644 blob 67045665db202cf951f839a5f3e73efdcfd45021 .gitignore
100644 blob fdddb29aa445bf3d6a5d843d6dd77e10a9f99657 LICENSE
100644 blob da4a4b16b47061a625e8b977a1d7a490982ff75e README.md
100644 blob ccd0f2ff642e953d8ee04e98a62f8ad8167d05a8 index.js
```

就像目录递归地包含其他目录和文件一样，一个 tree 对象即可表示整个工作区中所有已提交目录及文件的内容，也就是说提交历史中的每一个提交都包含着一份完整的某一时刻的文件快照，并通过保存上一次提交的引用形成连续的文件快照历史。

## [工作流程](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/git-three-trees.png)

1. 假设我们进入到一个新目录，其中有一个 README 文件。此时暂存区为空，提交历史为空，HEAD 引用指向未创建的 master 分支。

1. 现在我们想提交该文件，首先需要通过 `git add` 将其添加到暂存区。此时 Git 将在 .git/objects 目录中以该文件的内容生成一个 blob 对象，并将 blob 对象的信息添加到 .git/index 文件中。

1. 接着运行 `git commit` ，它会取得暂存区中的内容生成一个 tree 对象，该 tree 对象即为工作区文件的永久快照，然后创建一个指向该 tree 对象的提交对象，最后更新 master 指向本次提交。

1. 假如我们在工作区编辑了文件，Git 会将其与暂存区现有文件快照进行比较，在 `git add` 了更改的文件后，根据文件当前内容生成新的 blob 对象并更新 .git/index 文件中的引用 ID。git commit 的过程与之前类似，但是新的提交对象会以 HEAD 引用指向的提交作为父提交，然后更新其引用的 master 指向新创建的提交。

1. 当我们 `git checkout` 一个分支或提交时，它会修改 HEAD 指向新的分支引用或提交，将暂存区填充为该次提交的文件快照，然后将暂存区的内容解包复制到工作区中。

## [Git 基本操作](#目录)

### 配置命令

```sh
# 列出当前配置
git config --list
# 列出本地 Repository 配置
git config --local --list
# 列出全局配置
git config --global --list
# 列出系统配置
git config --system --list
```

### 把 Git 的默认分支 master 修改成 main

#### 把默认分支改为 main

```sh
git config --global init.defaultBranch main
```

#### 修改已创建项目的主分支为 main

```sh
# 把当前master分支改名为main, 其中-M的意思是移动或者重命名当前分支
git branch -M main
```

### 初始化仓库及操作

```sh
# 初始化一个仓库
git init
# 添加文件到暂存区，后面可以跟多个文件，以空格区分
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

### git status

通常我们需要查看一个文件的状态

```sh
git status
```

- `Changes not staged for commit`

  表示得大概就是工作区有该内容，但是缓存区没有，需要我们 git add

- `Changes to be committed`

  一般而言，这个时候，文件放在缓存区了，我们需要 git commit

- `nothing to commit, working tree clean`

  这个时候，我们将本地的代码推送到远端即可

### 修改提交信息

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 --amend 选项的提交命令来重新提交：

```sh
git commit --amend
```

这个命令会将暂存区中的文件提交。如果自上次提交以来你还未做任何修改（**例如，在上次提交后马上执行了此命令**）， 那么快照会保持不变，而你所修改的只是提交信息。

文本编辑器启动后，可以看到之前的提交信息。 编辑后保存会覆盖原来的提交信息。

例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```sh
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```

最终你只会有一个提交——第二次提交将代替第一次提交的结果。

### 撤销修改

```sh
git checkout -- [文件名]
```

说明: 把文件在**工作区**的修改全部撤销，这里有两种情况：

- 一种是文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
- 一种是文件已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是撤销当前**工作区**的修改

> 不带路径的 `git checkout [commit or branch]` 用于「检出」某个提交或分支，检出可以理解为「拿出来查看」。
>
> **若工作区与暂存区存在未提交的本地更改，checkout 还会尝试将文件快照与本地更改做简单的合并，若合并失败，将会中止操作并恢复到 checkout 之前的状态。** 因此 checkout 对工作区是安全的，它不会丢弃工作区所做的更改。

### git pull

#### git pull 命令的原理

`git fetch` 会查询 git remote 中所有的远程仓库所包含分支的最新提交，并将其记录到 **.git/FETCH_HEAD** 文件中。

**.git/FETCH_HEAD** 是一个版本链接，指向着目前已经从远程仓库取下来的所有分支的最新提交。

`git pull` 命令等价于：先执行 `git fetch`，再执行 `git merge FETCH_HEAD` 将远程仓库对应分支的最新提交合并到当前本地分支中。

#### git pull 命令中各选项的含义

其中 `git pull` 有这几项常见的选项搭配：

- 不带任何选项的 `git pull` 命令：先尝试快进合并，如果不行再进行正常合并生成一个新的提交。
- `git pull --ff-only` 命令：只尝试快进合并，如果不行则终止当前合并操作。
- `git pull --no-ff` 命令：禁止快进合并，即不管能不能快进合并，最后都会进行正常合并生成一个新的提交。
- `git pull --rebase` 命令：先尝试快进合并，如果不行再进行变基合并。

### 合并两个默认情况下没有共同基础的分支

> **I always see this error if when I create a new Github repository with a README.md, then pull it to a local repository at the first time.**

```sh
git pull origin <branch-name> --allow-unrelated-histories
```

> "git merge" used to allow merging two branches that have no common base by default, which led to a brand new history of an existing project created and then get pulled by an unsuspecting maintainer, which allowed an unnecessary parallel history merged into the existing project. The command has been taught not to allow this by default, with an escape hatch --allow-unrelated-histories option to be used in a rare event that merges histories of two projects that started their lives independently.

### 不建议在没有为偏离分支指定合并策略时执行 pull 操作

当使用 Git 版本为 2.27.0 以上时，使用 `git pull` 命令出现以下的警告：

```sh
warning: Pulling without specifying how to reconcile divergent branches is
discouraged. You can squelch this message by running one of the following
commands sometime before your next pull:

  git config pull.rebase false  # merge (the default strategy)
  git config pull.rebase true   # rebase
  git config pull.ff only       # fast-forward only

You can replace "git config" with "git config --global" to set a default
preference for all repositories. You can also pass --rebase, --no-rebase,
or --ff-only on the command line to override the configured default per
invocation.
```

该警告的中文版本文案描述如下：

```sh
warning: 不建议在没有为偏离分支指定合并策略时执行pull操作。
您可以在执行下一次pull操作之前执行下面一条命令来抑制本消息：

git config pull.rebase false  # 合并（默认缺省策略）
git config pull.rebase true   # 变基
git config pull.ff only       # 仅快进

您可以将 "git config" 替换为 "git config --global" 以便为所有仓库设置
缺省的配置项。您也可以在每次执行 pull 命令时添加 --rebase、--no-rebase，
或者 --ff-only 参数覆盖缺省设置。
```

**首先理解什么是偏离分支**：

当本地的分支落后于远程分支时，本地分支又自行修改项目文件生成了新的提交，这时本地分支再执行 `git pull` 命令就不能快进合并，并且还容易发生冲突。这时的本地分支便称为偏离分支，因为这时的本地分支的最新提交跟远程分支的最新提交不同，产生了偏离。

**接着理解什么是合并策略**：

合并策略便是 `git merge --ff-only`、`git merge --no-ff`、`git merge --rebase` 这三种常见的合并策略，分别代表着快进合并、非快进普通合并、变基合并。

而我们执行不带任何选项的 `git pull` 命令时，Git 就不知道我们到底想用哪种合并策略来执行 `git pull`，因此 Git 会给出上述的警告文案，建议我们通过`git config` 命令应该按照这三种合并策略的哪种来执行。

**解决问题**：

- 保持当前的默认合并策略：`git config pull.rebase false`，
因为 `pull.ff` 默认是没有指定的，而没有指定的 `pull.ff` 的默认值与显式指定为 `false` 的效果一致。
- `git pull` 时只接受快进合并和变基合并：`git config pull.ff only`，保证每次执行不带选项的 `git pull` 时要么快进合并成功，要么快进合并失败。如果快进合并失败，再显式执行 `git pull --rebase` 进行变基合并即可。

### git switch

`git switch` 命令专门用于切换分支，可以用来替代 `checkout` 的部分用途。

**创建并切换到指定分支（ -C 大小写皆可）**：

```sh
git switch -C <new-branch>
```

切换到已有分支：

```sh
git switch <branch>
```

和 `checkout` 一样，`switch` 对工作区是安全的，它会尝试合并工作区和暂存区中的本地更改，如果无法完成合并则会中止操作，本地更改会被保留。

`switch` 的使用方式简单且专一，它无法像 `checkout` 一样对指定提交使用：

```sh
git switch ea4c48a
```

fatal: 期望一个分支，得到提交 'ea4c48a'

### git reset

`git reset` 的主要作用是将 HEAD 重置为指定的提交，有 -—soft、--mixed、--hard 三种主要的命令选项。

- `--soft` 只会对提交历史进行重置，不会再对暂存区以及工作区进行任何更改。

- `--mixed` 选项是 `git reset` 它除了重置提交历史，还会更新暂存区，例如暂存区有未提交的文件，工作区又对文件做了修改，他会直接把暂存区的修改丢掉。

- `--hard` 是 reset 最直接、最危险以及最常用的选项。它除了重置提交历史，工作区和暂存区中所有未提交的更改都会永久丢失，但被重置的提交仍有办法找回。

另一个关于 reset 的实践是，不要在公共分支上执行 reset。公共分支是指你与其他团队成员协作开发的分支。如果你需要修复一个公共提交引入的问题，请使用专门为此目的设计的 `git revert`。

### git restore

`restore` 命令用于还原工作区或暂存区中的指定文件或文件集合：

```sh
# 撤销工作区的修改
git restore [文件名] #同 git checkout -- [文件名] 同价
# 撤销暂存区的修改
git restore [文件名] --staged
```

### git stage

添加文件到暂存区

> git 的 add，是一个容易引起疑问的命令。同时，`git diff --cached` 是比较 stage 的文件的差异的，也是一个不直观的命令。

github 2008 年的 blog 中，也提到，容易引起混淆：

> things like making use of the term ‘stage’ for things that happen in the index (such as using ‘git diff —staged’ instead of ‘git diff —cached’) is being worked on. I’m excited that staging files may soon be done via ‘git stage’ rather-than/in-addition-to ‘git add’. This is nice for new users who often have a hard time seeing why you have to keep ‘git add’ing to stage your changes.

事实上，在 git 的后续版本中，就做了两个修改：

`git stage` 作为 `git add` 的一个同义词

`git diff --staged` 作为 `git diff --cached` 的相同命令

为了容易理解，推荐大家使用 `git stage` 和 `git diff --staged` 这两个命令，而 `git add` 和 `git diff --cached` 这两个命令，仅仅为了保持和以前的兼容做保留。

### git rebase

#### git rebase 作用于分支合并

> rebase 翻译为变基，他的作用和 merge 很相似，用于把一个分支的修改合并到当前分支上。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/b169721a6bfc42a7b4754f7c5d65672d_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

#### git rebase 交互模式

在开发中，常会遇到在一个分支上产生了很多的无效的提交，这种情况下使用 rebase 的交互式模式可以把已经发生的多次提交压缩成一次提交，得到了一个干净的提交历史，例如某个分支的提交历史情况如下：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-147.png)

进入交互式模式的方式是执行：

```sh
git rebase -i <base-commit>
```

参数 `base-commit` 就是指明操作的基点提交对象，基于这个基点进行 `rebase` 的操作，对于上述提交历史的例子，我们要把最后的一个提交对象（ 8061e866 ）之前的提交压缩成一次提交，我们需要执行的命令格式是：

```sh
git rebase -i 8061e866
```

> TIPS：有时候 `git rebase -i --root` 会很有用

此时会进入一个 vim 的交互式页面，编辑器列出的信息像下列这样。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-1c4.png)

想要合并这一堆更改，我们要使用 Squash 策略进行合并，即把当前的 commit 和它的上一个 commit 内容进行合并， 大概可以表示为下面这样，在交互模式的 rebase 下，至少保留一个 pick，否则命令会执行失败。

修改文件后 按下 : 然后 wq 保存退出，此时又会弹出一个编辑页面，这个页面是用来编辑提交的信息，修改为 feat: 变基，最后保存一下

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-1be.png)

> 特别注意，只能在自己使用的 feature 分支上进行 rebase 操作，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录。

#### git merge 和 git rebase 的区别

不同于 `git rebase` 的是，`git merge` 在不是 fast-forward（快速合并）的情况下，会产生一条额外的合并记录，类似 `Merge branch 'xxx' into 'xxx'` 的一条提交信息。

另外，在解决冲突的时候，用 merge 只需要解决一次冲突即可，简单粗暴，而用 rebase 的时候 ，需要依次解决每次的冲突，才可以提交。

#### 解决 git rebase 操作后推送远端分支不成功的问题

```sh
git push -f
```

### git cherry-pick

`git cherry-pick` 可以理解为”挑拣”提交，和 merge 合并一个分支的所有提交不同的是，它会获取某一个分支的单笔提交，并作为一个新的提交引入到你当前分支上。当我们需要在本地合入其他分支的提交时，如果我们不想对整个分支进行合并，而是只想将某一次提交合入到本地当前分支上，那么就要使用 `git cherry-pick` 了。

一次转移多个提交：

```sh
git cherry-pick commit1 commit2
```

上面的命令将 commit1 和 commit2 两个提交应用到当前分支。

多个连续的 commit，也可区间复制：

```sh
git cherry-pick commit1^..commit2
```

上面的命令将 commit1 到 commit2 这个区间的 commit 都应用到当前分支（包含commit1、commit2），commit1 是最早的提交。

### git stash

会有这么一个场景，现在你正在用你的 feature 分支上开发新功能。这时，生产环境上出现了一个 bug 需要紧急修复，但是你这部分代码还没开发完，不想提交，怎么办？这个时候可以用 `git stash` 命令先把工作区已经修改的文件暂存起来，然后切换到 hotfix 分支上进行 bug 的修复，修复完成后，切换回 feature 分支，从堆栈中恢复刚刚保存的内容。

基本命令如下

```sh
git stash #把本地的改动暂存起来
git stash save "message" # 执行存储时，添加备注，方便查找。
git stash pop # 应用最近一次暂存的修改，并删除暂存的记录
git stash apply  # 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}
git stash list # 查看 stash 有哪些存储
git stash clear # 删除所有缓存的 stash
```

例如，我正在开发一个新功能，修改了 1.js 文件里的内容，

还没开发完成，这个时候，我想切换到 hotfix 分支上修复 bug，得暂停下开发切换到 hotfix 分支，但是现在工作区还有内容，此时如果切换分支 Git 会报出下面的错误

```sh
error: Your local changes to the following files would be overwritten by checkout:
        1.js
Please commit your changes or stash them before you switch branches.
Aborting
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-74s.png)

上面那句话的意思就是说工作区有文件修改，不能提交，需要先进行 commit 或者 stash 操作，执行 git stash，结果如下

```sh
Saved working directory and index state WIP on stash: 22e561c feat: add 1.js
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-76d.png)

此时，我们的工作区已经干净了，可以切换到 hotfix 分支进行 bug 修复的工作，假设我们现在 bug 修复完成了，继续切回 feature 分支进行原本功能的开发，此时只需要执行 `git stash pop`，之前我们暂存的修改就会恢复到工作区，如下图所示

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-776.png)

当我们想要暂存文件，切换分支做某些事的时候，可以用 `git stash` 这种机制帮助开发。

> 推荐在使用 stash 的相关命令时，每一次暂存的时候，不要直接使用 `git stash` 命令进行暂存下来，而是使用 `git stash save "message..."` 这种方式，给本次的提交做一个信息的记录。这样，想应用更改的时候，先通过 `git stash list` 查看一下所有的暂存列表。之后，推荐使用 `git stash apply stash@${num}` 的方式进行应用对应的 stash，这样不会清空已有的 stash 的列表项，并且能应用到当前的工作区，不需要这个暂存的话，再手动清除就可以了。

### 配置 git alias 提升工作效率

它的基本用法是 `git config --global alias.<简化的字符> 原始命令`

```sh
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch

# git config --global --unset alias.ci 取消别名
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/terminal/SCR-20220403-7do.png)

这些命令其实是更新你全局的 `.gitconfig` 文件，该文件用来保存全局的 git 配置，你可以直接 `code ~/.gitconfig` 手动添加

```sh
[alias]
st = status -sb
co = checkout
br = branch
mg = merge
cm = commit -m
ds = diff --staged
dt = difftool
mt = mergetool
last = log -1 HEAD
latest = for-each-ref --sort=-committerdate --format=\"%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\"
ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
type = cat-file -t
dump = cat-file -p
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## 参考资料

- [git 工作原理与撤销操作图解](https://www.waynerv.com/posts/git-undo-intro/)
- [为什么要先 git add 才能 git commit ？](https://www.zhihu.com/question/19946553)
- [我在工作中是如何使用 Git 的](https://juejin.cn/post/6974184935804534815)
- [高频 Git 面试题](https://zhuanlan.zhihu.com/p/101954895)
- [Git refusing to merge unrelated histories on rebase](https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase)
- [不建议在没有为偏离分支指定合并策略时执行pull 操作](https://blog.csdn.net/wq6ylg08/article/details/114106272)

<!--
## Mac 中 Git 大小写问题的解决方案

> **Git 不会发现大小写的变化**

使用 `git mv -f` 和 `mv` 同时更改文件名，避免本地文件系统与仓库中代码不一致。 -->
