# 为什么别人的终端这么好看？😭


那就来一起美化一下吧～

---

由于oh-my-zsh太慢了，所以这期教程使用zim作为框架～
如果您没有安装zsh，请先`sudo pacman -S zsh`。

## zim

### 安装

```shell
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```

### 编辑配置文件

```shell
nano ~/.zimrc
```

### 添加powerlevel10k模块并安装

```shell
zmodule romkatv/powerlevel10k
# CTRL+X Y ENTER
zimfw install
```

### 切换默认shell并重启

```shell
sudo nano /etc/passwd
# 修改{yourname:x:1000:1000::/home/username:}这一行把/usr/bin/bash改成/usr/bin/zsh
# CTRL+X Y ENTER
reboot
```

下次启动zsh时会让您配置powerlevel10k。请按照自己需求选择～

## 字体

powerlevel10k中有很多图标无法显示，可以按照以下方法解决：

### 安装字体

```shell
sudo pacman -S ttf-jetbrains-mono-nerd
```

### 切换终端默认字体

由于安装教程里面是 KDE ，所以这里以 Konsole 为例～

```shell
# 右键点击 - 编辑当前方案 - 外观
# 字体(选择) - 选择JetBrainsMono Nerd Font(不要选MONO!!) - 确定 - 确定
```

在这之后，您就可以使用ZSH了～
