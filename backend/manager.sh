#!/bin/bash

# 定义脚本路径

export REAL_ROOT="$(realpath $(dirname $0)/..)"
FRIENDS_SCRIPT="$REAL_ROOT/backend/friends.sh"
INFORMATIONS_SCRIPT="$REAL_ROOT/backend/informations.sh"
POSTS_SCRIPT="$REAL_ROOT/backend/posts.sh"

# 主菜单函数
main_menu() {
	choice=$(whiptail --title "网站管理菜单" --menu "请选择操作" 15 60 5 \
		"I" "个人信息修改" \
		"L" "友情链接管理" \
		"E" "博客文章管理" \
		"P" "提交更改" \
		"Q" "退出" 3>&1 1>&2 2>&3)

	case $choice in
	L)
		if [ -x "$FRIENDS_SCRIPT" ]; then
			bash "$FRIENDS_SCRIPT"
		else
			whiptail --msgbox "友情链接管理脚本 $FRIENDS_SCRIPT 不存在或没有执行权限。" 10 30
		fi
		main_menu
		;;
	I)
		if [ -x "$INFORMATIONS_SCRIPT" ]; then
			bash "$INFORMATIONS_SCRIPT"
		else
			whiptail --msgbox "个人信息修改脚本 $INFORMATIONS_SCRIPT 不存在或没有执行权限。" 10 30
		fi
		main_menu
		;;
	E)
		if [ -x "$POSTS_SCRIPT" ]; then
			bash "$POSTS_SCRIPT"
		else
			whiptail --msgbox "博客文章管理脚本 $POSTS_SCRIPT 不存在或没有执行权限。" 10 30
		fi
		main_menu
		;;
	P)
		cd $REAL_ROOT
		sudo make push
		;;
	Q)
		exit 0
		;;
	esac
}

# 启动主菜单
main_menu
