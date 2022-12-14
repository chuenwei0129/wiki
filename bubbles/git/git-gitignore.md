# gitignore 失效

> 这条笔记创建于: 2022 年 10 月 28 日，星期五，00: 32。

有时一些文件最好不要用 Git 跟踪。这通常在名为 `.gitignore` 的特殊文件中完成。你可以在 [github.com/github/gitignore](https://github.com/github/gitignore) 找到有用的 `.gitignore` 文件模板。

**问题：**

在使用 git 进行版本控制的过程中发现，将想被忽略的文件(文件夹)配置到 `.gitignore` 文件中后，实际修改了想被忽略的文件，调用 `git status` 查看时，仍然会提示提交这些文件。也就是说实际并没有被忽略

**原因：**

原因是 `git ignore` 只会对不在 git 仓库中的文件进行忽略，如果这些文件已经在 git 仓库中，则不会忽略。所以如果需要忽略的文件已经提交到本地仓库，则需要从本地仓库中删除掉，如果已经提交到远端仓库，则需要从远端仓库中删除。删除 `.gitignore` 文件才能实际生效。

**为什么我增加了 `.gitignore` 里的规则却没有效果？**

这是因为我们误解了 `.gitignore` 文件的用途，该文件只能作用于 `Untracked Files`，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。

之所以你的规则不生效，是因为那些 `.log` 文件曾经被 Git 记录过，因此 `.gitignore` 对它们完全无效。这也正是开头那段简短答案所做的事情：

1. 从 Git 的数据库中删除对于该文件的追踪；
2. 把对应的规则写入 `_.gitignore_`，让忽略真正生效；
3. 提交＋推送。

只有这样做，所有的团队成员才会保持一致而不会有后遗症，也只有这样做，其他的团队成员根本不需要做额外的工作来维持对一个文件的改变忽略。

最后有一点需要注意的，`git rm --cached` 删除的是追踪状态，而不是物理文件；如果你真的是彻底不想要了，你也可以直接 rm＋忽略＋提交。

**解决：**

- `git rm -r --cached` 要忽略的文件 (如: `git rm -r --cahced build/*`, 如修改列表中的内容全部是不需要的, 那么你可以使用最最简单的命令搞定 `git rm -r --cached .`)
- `git add .`
- `git commit -m " commit ....."`
- `git push`

push 之后其他开发人员 pull 之后, ignore 规则就对其生效了.
