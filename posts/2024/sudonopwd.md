---
title: "sudo 不请求密码"
description: "本文警告 “sudo 不请求密码” 行为存在风险，作者不担责。接着介绍操作步骤：先通过 whoami 记下用户名，确保能使用 root 账户后，用 vim 打开 /etc/sudoers 文件，在特定内容下一行添加 “您的用户名 ALL=(ALL:ALL) NOPASSWD:ALL”，保存后切换回原账户，重启终端后无需密码即可用 sudo 。"
clock: "2024-08-05"
---

> [!DANGER] 警告
> `sudo` 不请求密码是一个非常危险的行为，请务必三思而后行，作者不承担任何后果！

## 我是谁

请使用您的账户执行 `whoami`，记下输出 (输出就是您的用户名)。这时，请不要使用 root 账户。

```bash
whoami
```

## 确保您可以使用 root 账户

如果您可以使用 root 账户，请执行以下命令切换:

```bash
su
```

然后输入密码，回车，就切换完毕了，这里输入的密码不会显示哦～

## 编辑 sudoers 文件

### 1. 使用 vim 打开

```bash
vim /etc/sudoers
```

### 2. 加入一些内容

请找到 `ALL ALL=(ALL:ALL) ALL` 或者末尾，在下一行 加入 (按下 i 编辑)：

```
您的用户名 ALL=(ALL:ALL) NOPASSWD:ALL
```

### 3. 保存编辑

按下 ESC，输入 `:wq` 以保存退出。

### 4. 切换用户

使用 `su 用户名` 即可切换至您的账户。<br>
以后（似乎需要重启终端后）无需密码即可使用 `sudo` 。
