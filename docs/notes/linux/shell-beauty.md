# 美化终端
如果您的终端不好看，可以跟着这期教程来美化一下。
由于 `oh-my-zsh` 比较慢，所以这期教程使用 ```zim``` 作为框架。<br>
如果您没有安装 zsh，请先安装 zsh。

## zim

### 安装

```shell
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```

### 编辑配置文件

```shell
nano ~/.zimrc
```

### 添加 powerlevel10k 模块并安装

```shell
zmodule romkatv/powerlevel10k
# CTRL+X Y ENTER
zimfw install
```

### 切换默认 shell 并重启

```shell
sudo nano /etc/passwd
# 修改{yourname:x:1000:1000::/home/username:}这一行把/usr/bin/bash改成/usr/bin/zsh
# CTRL+X Y ENTER
reboot
```

下次启动 zsh 时会让您配置 powerlevel10k 。请按照自己需求选择。

## 字体

powerlevel10k 中有很多图标无法显示，可以按照以下方法解决：

### 安装字体 (适用于 Arch Linux)

```shell
sudo pacman -S ttf-jetbrains-mono-nerd
```

### 切换终端默认字体

这里以 Konsole 为例。

```shell
# 右键点击 - 编辑当前方案 - 外观
# 字体(选择) - 选择JetBrainsMono Nerd Font(不要选MONO!!) - 确定 - 确定
```
