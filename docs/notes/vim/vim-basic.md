# 我决定从 VSCode 转到 NeoVim 了 

大家好。在这篇文章中，我会分享一下我为何放弃 VSCode 使用 NeoVim 和使用 NeoVim 的一些经验～

## 为何我不再用 VSCode

我的电脑配置很垃圾，每次一打开 VSCode 内存就被跑满，甚至卡死。

而且我是个懒人，我感觉用鼠标选来选去的太麻烦了，编程编久了胳膊有一点酸。

在我了解 NeoVim 以后，感觉太炫酷了，我需要立马学习 Vim/NeoVim 。

## 一些经验

### 安装

我是 Arch Linux，所以

```
sudo pacman -S neovim
```

### 来用一用其他人的配置吧！

我个人感觉 AstroVim 挺不错的，以下是官方的安装步骤：

```bash
# Make a backup of your current nvim config (if exists)
mv ~/.config/nvim ~/.config/nvim.bak

# Clean neovim folders (Optional but recommended)
mv ~/.local/share/nvim ~/.local/share/nvim.bak
mv ~/.local/state/nvim ~/.local/state/nvim.bak
mv ~/.cache/nvim ~/.cache/nvim.bak

# Clone the repository
git clone --depth 1 https://github.com/AstroNvim/template ~/.config/nvim
rm -rf ~/.config/nvim/.git
nvim
```

在这之后，`lazy.nvim` 会安装所需要的插件。

### 编辑文件的一些技巧

#### 打开文件

首先，你需要知道怎么打开一个文件。

```bash
nvim 文件名
```

如果文件不存在，则会创建 ( 如果你不保存的话，文件不会存在 )。

#### 保存和退出

打开文件以后，如果你要保存，请按下 ESC 并输入 `:w`。

> [!NOTE] 提示
> 关于为何要按下 ESC
> 按下 ESC 是为了切换到 NORMAL 模式。<br>
> 如果你已经是 NORMAL 模式了，那就不需要按下 ESC。

如果你要退出，请按下 ESC 并输入 `:q`，如果这个文件被更改了，但是未保存，请按下 ESC 输入 `:q!`。

如果你要保存并退出，请输入 `:wq`。

#### 搜索内容

在 NORMAL 模式中按下 `/` 可以向下匹配，按下 `?` 可以向上匹配。

#### 跳转到某一行

请按下 ESC 并输入 `:要跳转的行号`。

#### 删除

在 NORMAL 模式中，如果你只是要删除一行，请输入 `dd`即可删除一行。

(dd其实是剪切。)

如果你是要删除一行并更改，请输入 `cc` 。

> [!NOTE] 小提示
>
> 可以在操作前面加上数字变成多行，例如 `2dd`

#### 撤销操作

在 NORMAL 模式中，按下 `u` 即可撤销，按下 `Ctrl+r` 即可重做。

#### 复制粘贴

在 NORMAL 模式中，复制一行请输入 `yy`，剪切一行请输入 `dd`，粘贴请输入 `p`。

复制一个或多个字符，多行，可以切换到 `VISUAL` 模式，按下 `v` 即可进入，使用 hjkl/上下左右 选择，输入 y 复制，输入 d 剪切。

> [!NOTE] 再次提示
>
> 同样，可以在操作前面加上数字变成多行，例如 `2dd`

#### 编辑文件

在 NORMAL 模式中，按下 `i` 即可在光标前开始编辑，此时，将切换到 Insert 模式。

#### 替换

在```NORMAL```模式中在你想替换的字符下按下```r```即可替换单个字符，按```R``即可进入到替换模式。

其他的就要靠你自己去探索啦～
