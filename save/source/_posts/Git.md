---
categories:
- Git
tags:
- Git
---

[Git大全](https://gitee.com/all-about-git)
## 版本控制
是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。
简单来说就是用于管理多人协作开发项目的技术
常见的版本控制工具：
- Git（分布式版本控制）每个人都拥有全部的代码--安全隐患。不会因为服务器损坏或者网络问题，造成不能工作的情况。
- SVN（集中式版本控制）所有的版本数据都保存在服务器上

## Git与SVN最主要的区别
SVN是集中式版本控制系统，版本库是集中放在中央服务器的，而工作的时候，用的都是自己的电脑，所以首先要从中央服务器得到最新的版本，然后工作，完成工作后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，对网络带宽要求较高。
Git是分布式版本控制系统，没有中央服务器，每个人的电脑就是一个完整的版本库，工作的时候不需要联网了。因为版本都在自己电脑上，协同的方法就是这样的：比如说自己在电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

## Git的历史
Linux内核开源项目的维护，开发出Git用于管理Linux。Linus Benedic Torvalds(李纳斯·托沃兹)1969、芬兰

## 安装Git及环境配置
速度慢，使用淘宝镜像
### 基本的Linux命令
- cd：改变目录
- cd .. ：回退到上一个目录，直接cd进入默认目录
- pwd：显示当前所在的目录路径
- ls (ll)：列出当前目录中的所有文件
- touch：新建一个文件
- rm：删除一个文件
- mkdir：新建一个文件夹
- rm -r：删除一个文件夹
- mv：移动文件
- reset：重新初始化终端/清屏
- clear：清屏
- history：查看命令历史
- help：帮助
- exit：退出
- `#`：表示注释

## Git的必要配置
``` shell
git config --global user.name "" #名称
git config --global user.email "" #邮箱

#查看配置
#查看系统config
git config --system --list
#查看当前用户（global）配置
git config --global --list
```

## Git基本理论（核心）
- Workspace：工作区，平时存放项目代码的地方
- Index/Stage：暂存区，用于临时存放你的改动，事实上它只是个文件，保存即将提交到文件列表信息
- Repository：仓库区（或本地仓库），就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中HEAD指向最新放入仓库的版本
- Remote：远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换

## Git文件操作
### 文件的4种状态
- Untracked：未跟踪
- Unmodify：文件已入库，未修改
- Modified： 已修改
- Staged：暂存状态

## Git分支
``` shell

#列出所有本地分支
git branch

#列出所有远程分支
git branch -r

#新建一个分支，但依然停留在当前分支
git branch [branch-name]

#新建一个分支，并切换到该分支
git checkout -b [branch]

#合并指定分支到当前分支
git merge [branch]

#删除分支
git branch -d [branch-name]

#删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```