---
title: "在 Arch Linux 上安装输入法"
description: "Arch Linux 安装后没有输入法，那我们怎么装上输入法呢？"
clock: "2024-08-07"
tags:
  - Arch
  - Linux
---

> [!WARNING] 警告
> 本期教程为 Arch Linux (系) 撰写的。<br>
> 如果您是 Debian/Red Hat 系的，那么安装方法与此不同。

## 安装输入法

```shell
 sudo pacman -S fcitx5 fcitx5-configtool fcitx5-lua fcitx5-chinese-addons
```

## 配置

### 如果您是Wayland (Gnome/KDE 6/...):

请在 /etc/environment 添加点东西吧～

```shell
QT_IM_MODULE=fcitx5
SDL_IM_MODULE=fcitx5
XMODIFIERS=@im=fcitx5
```

Gnome 还可能需要安装 kimpanel 插件才可以正常运行哦<br><br>

### 如果您是Xorg (Gnome Xorg/KDE 5 or KDE Xorg/...):

先在 ~/.pam_environment 里加上这些

```shell
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=\@im=fcitx
SDL_IM_MODULE DEFAULT=fcitx
```

然后在 ~/.xprofile 里加上下面的

```shell
export QT_IM_MODULE=fcitx5
```

现在就 OK 了

## 重启

重启后就能输入文字了，您可以在终端运行fcitx5-configtool ，点击全局选项以修改快捷键。
