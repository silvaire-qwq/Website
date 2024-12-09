---
title: "安装 Arch Linux"
description: "安装有风险，请三思而后行。"
date: 2024-08-06
---

# 安装 Arch Linux 

你好呀，本期教程将会教您如何安装Arch Linux (并且是 Btrfs 文件系统)。

安装有风险，请三思而后行。

> [!DANGER] 警告
> 在查看本教程之前，请确定您是UEFI启动哦～

## 准备

1. 一个 [Arch Linux 镜像](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/archlinux-x86_64.iso) (如果你没有的话可以点击一下 Arch Linux 镜像，会直接下载下来哦)。
2. 一个写盘工具。
3. 如果要装双系统的话，请提前先分好区 (空的，不要有文件系统) 哦。
4. 最重要的是 USB 和 电脑。

## 写盘

请公主王子们现在把 ISO 镜像写入到 USB 里吧～

## 启动

> [!DANGER] 警告
> 一定，一定关闭您电脑的安全启动！

现在请从 USB 启动吧～

## 我已经进来了 😎

### 如果电脑没插网线的话，请执行以下操作

```shell
iwctl
station wlan0 scan # 扫描网络
station wlan0 get-networks # 列出 wifi 网络
station wlan0 connect 你的网络名 # 连接 {wifi-name}，在这之后会要求您输入密码。
exit # 退出
```

### 为了不让一会安装系统时下载软件太慢，我们来换一个源吧

```shell
systemctl stop reflector
rm -rf /etc/pacman.d/mirrorlist
nano /etc/pacman.d/mirrorlist
# 加入以下内容
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
# Ctrl+X, Y, Enter保存
```

### 单系统分区

```shell
# 查看分区
fdisk -l
# 编辑分区
cfdisk /dev/{your_disk}
# 分区:
[NEW] -> 新建一个500M的分区(输入) -> [TYPE] -> 选择EFI
[NEW] -> 新建一个分区
请先确定是否正确再看下面的！！
[WRITE] -> [QUIT]

# 再次确定是否正确
fdisk -l
# 创建EFI
mkfs.fat -F32 /dev/{your_part}
# 再次确定是否正确
fdisk -l
# 创建btrfs
mkfs.btrfs -L ArchLinux /dev/{your_part}
```

### 双系统分区

```shell
# 查看分区
fdisk -l
# 编辑分区
cfdisk /dev/{your_disk}
# 分区:
[NEW] -> 新建一个分区
请先确定是否正确再看下面的！！
[WRITE] -> [QUIT]

# 再次确定是否正确
fdisk -l
# 再次确定是否正确
fdisk -l
# 创建btrfs
mkfs.btrfs -L ArchLinux /dev/{your_part}
```

### 创建 Btrfs 分区

```shell
# 挂载btrfs分区
mount /dev/{your_part} /mnt
# 创建子卷
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@boot
# 卸载
umount /mnt
# 挂载
mount -t btrfs -o subvol=/@,compress=zstd /dev/sdxn /mnt
mount -t btrfs -o subvol=/@home,compress=zstd /dev/sdxn /mnt/home --mkdir
mount -t btrfs -o subvol=/@boot,compress=zstd /dev/sdxn /mnt/boot --mkdir
mount /dev/{efi} /mnt/boot/efi --mkdir
```

## 终于弄完了，可以开始了吧？累似我了 😭

### 先来安装个基本系统

```shell
pacman -Sy archlinux-keyring
pacstrap /mnt base base-devel linux linux-firmware btrfs-progs networkmanager vim nano sudo iwd net-tools
```

### 再写入挂载信息

```shell
genfstab -U /mnt > /mnt/etc/fstab
sudo nano /mnt/etc/fstab
# 删掉subvolid=256, 这种东西，不然恢复快照以后就无法开机了
```

### 切换到新系统里面

```shell
arch-chroot /mnt
```

### 配置一下吧～

```shell
# ---------------------------------

nano /etc/hostname
# 输入一个你喜欢的主机名，Ctrl+X, Y, Enter

# ---------------------------------

nano /etc/hosts

# 加入：
127.0.0.1   localhost
::1         localhost
127.0.1.1   archlinux.localdomain archlinux
# Ctrl+X, Y, Enter

# ---------------------------------

# 切换时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc

# ---------------------------------

# 语言
nano /etc/locale.gen

# 去掉 en_US.UTF-8 和 zh_CN.UTF-8 前面的#
# Ctrl+X, Y, Enter

# ---------------------------------

locale-gen
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
# 先设置英语，装完桌面再改

# ---------------------------------

# 设置root密码 (输入的不会显示哦)
passwd root

# ---------------------------------

# 安装微码（根据情况选择）
pacman -S intel-ucode # Intel
pacman -S amd-ucode # AMD
```

### 再坚持一下，马上就能开机了～ (安装引导)

```shell
# ---------------------------------

pacman -S grub efibootmgr os-prober

# ---------------------------------

grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=ARCH

# ---------------------------------

vim /etc/default/grub
# 去掉最后一行的#
# ESC + :wq

# ---------------------------------

# 生成
grub-mkconfig -o /boot/grub/grub.cfg

# ---------------------------------

exit                     # 退回安装环境
umount -R /mnt           # 卸载新分区
reboot                   # 重启
```

## 你知道这一刻我等了多久了吗，终于装完了 😭

### 不不不，还没有呢，我们继续配置一点东西～

```shell
# ---------------------------------

# 启用网络管理器并联网
systemctl enable --now NetworkManager # 设置开机自启并启动 NetworkManager
nmtui # 联网 (第二个 -> 选择网络名 -> 输入密码 -> 退出)
# 用户

# ---------------------------------

useradd -m -G wheel -s /bin/bash {yourname}
passwd {username}
sudo nano /etc/sudoers
#%wheel ALL=(ALL:ALL) ALL -> %wheel ALL=(ALL:ALL) ALL (去掉注释)

# ---------------------------------

# 添加cn源
vim /etc/pacman.conf

# 添加：
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
# ESC + :wq

# ---------------------------------

rm -rf /etc/pacman.d/mirrorlist
nano /etc/pacman.d/mirrorlist
# 加入以下内容
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
# Ctrl+X, Y, Enter保存

# ---------------------------------

pacman -Syyu
```

### 最后一步了，来安装桌面吧～ (以 KDE Plasma 为例)

```shell
pacman -S plasma konsole dolphin xorg ark neofetch sddm
sudo rm -rf /etc/locale.conf
sudo echo "zh_CN.UTF-8" | sudo tee -a /etc/locale.conf
sudo systemctl enable --now sddm
```

## 这回装完了吧 😢

没错～ 恭喜你🎉～ Arch Linux 正式完成安装了～
