#!/bin/bash

# 定义网站根目录
ROOT_DIR=$(realpath $(dirname $0)/..)
BLOG_DIR="$ROOT_DIR/src/blogs"

# 定义编辑器
if [[ $(command -v nvim) ]]; then
	export BlogEditor=nvim
elif [[ $(command -v vim) ]]; then
	export BlogEditor=vim
elif [[ $(command -v nano) ]]; then
	export BlogEditor=nano
elif [[ $(command -v vi) ]]; then
	export BlogEditor=vi
else
	echo -e "\e[31;1m::\e[0m 因为您无可用编辑器，所以无法启动。"
fi

# 主菜单函数
main_menu() {
	choice=$(whiptail --title "博客文章后端管理" --menu "请选择操作" 15 60 4 \
		"C" "新建文章" \
		"L" "列出文章、修改和编辑" \
		"Q" "退出" 3>&1 1>&2 2>&3)

	case $choice in
	L)
		article_list
		;;
	C)
		new_article
		;;
	Q)
		exit 0
		;;
	esac
}

# 文章列表函数
article_list() {
	declare -A title_count
	declare -A title_files
	articles=()
	menu_items=()
	index=1
	while IFS= read -r -d '' file; do
		# 使用更健壮的方式提取标题
		title=$(grep -m 1 '^title:' "$file" | sed -E 's/^title:[[:space:]]*'"'"'([^'"'"']+)'"'"'[[:space:]]*$/\1/')
		if [ -n "$title" ]; then
			((title_count["$title"]++))
			title_files["$title"]+="$file "
		fi
	done < <(find "$BLOG_DIR" -name "*.md" -print0)

	for title in "${!title_count[@]}"; do
		if [[ ${title_count["$title"]} -eq 1 ]]; then
			articles+=("$title")
			menu_items+=("$index" "$title")
			((index++))
		else
			# 处理重复标题，通过序号区分
			count=1
			for file in ${title_files["$title"]}; do
				articles+=("$title ($count)")
				menu_items+=("$index" "$title ($count)")
				((index++))
				((count++))
			done
		fi
	done

	if [ ${#articles[@]} -eq 0 ]; then
		whiptail --msgbox "没有找到文章。" 10 30
		main_menu
	else
		selected_index=$(whiptail --title "文章列表" --menu "选择要操作的文章" 20 60 10 "${menu_items[@]}" 3>&1 1>&2 2>&3)
		if [ $? -eq 0 ]; then
			selected_title=${articles[$((selected_index - 1))]}
			# 去除可能的序号后缀
			pure_title=$(echo "$selected_title" | sed 's/ ([0-9]\+)$//')
			if [[ ${title_count["$pure_title"]} -gt 1 ]]; then
				index=$(echo "$selected_title" | sed 's/.* (\([0-9]\+\))$/\1/')
				file_index=$((index - 1))
				selected_file=$(echo ${title_files["$pure_title"]} | cut -d' ' -f$((file_index + 1)))
			else
				selected_file=$(echo ${title_files["$pure_title"]} | xargs)
			fi
			action=$(whiptail --title "操作选择" --menu "选择操作" 10 30 2 \
				"1" "编辑" \
				"2" "删除" 3>&1 1>&2 2>&3)
			case $action in
			1)
				$BlogEditor "$selected_file"
				;;
			2)
				if whiptail --yesno "确定要删除文章 '$selected_title' 吗？" 10 30; then
					if rm -f "$selected_file"; then
						whiptail --msgbox "文章 '$selected_title' 已删除。" 10 30
					else
						if whiptail --yesno "权限不足，是否使用 sudo 删除？" 10 30; then
							if sudo rm -f "$selected_file"; then
								whiptail --msgbox "文章 '$selected_title' 已删除。" 10 30
							else
								whiptail --msgbox "删除失败。" 10 30
							fi
						fi
					fi
				fi
				;;
			esac
		fi
	fi
	main_menu
}

# 新建文章函数
new_article() {
	while true; do
		title=$(whiptail --inputbox "输入标题" 10 30 3>&1 1>&2 2>&3)
		if [ -n "$title" ]; then
			break
		else
			whiptail --msgbox "标题不能为空，请重新输入。" 10 30
		fi
	done

	while true; do
		description=$(whiptail --inputbox "输入简介" 10 30 3>&1 1>&2 2>&3)
		if [ -n "$description" ]; then
			break
		else
			whiptail --msgbox "简介不能为空，请重新输入。" 10 30
		fi
	done

	tags=$(whiptail --inputbox "输入标签（可选，多个标签用空格分隔）" 10 30 3>&1 1>&2 2>&3)
	background_url=$(whiptail --inputbox "输入图片 URL（可选）" 10 30 3>&1 1>&2 2>&3)

	while true; do
		filename=$(whiptail --inputbox "输入文件名（不含 '.md'）" 10 30 3>&1 1>&2 2>&3)
		if [ -n "$filename" ]; then
			break
		else
			whiptail --msgbox "文件名不能为空，请重新输入。" 10 30
		fi
	done

	while true; do
		info="标题: $title\n简介: $description\n标签: $tags\n图片 URL: $background_url\n文件名: $filename"
		choice=$(whiptail --yesno "请确认以下信息：\n$info\n是否继续创建文章？选择否可返回主界面或者重新编辑。" 20 60 3>&1 1>&2 2>&3)
		exit_status=$?
		if [ $exit_status -eq 0 ]; then
			break
		elif [ $exit_status -eq 1 ]; then
			if whiptail --yesno "是否退出创建文章，返回主菜单？" 10 30 3>&1 1>&2 2>&3; then
				main_menu
			else
				# 重新输入信息
				while true; do
					title=$(whiptail --inputbox "输入标题" 10 30 3>&1 1>&2 2>&3)
					if [ -n "$title" ]; then
						break
					else
						whiptail --msgbox "标题不能为空，请重新输入。" 10 30
					fi
				done

				while true; do
					description=$(whiptail --inputbox "输入简介" 10 30 3>&1 1>&2 2>&3)
					if [ -n "$description" ]; then
						break
					else
						whiptail --msgbox "简介不能为空，请重新输入。" 10 30
					fi
				done

				tags=$(whiptail --inputbox "输入标签（可选，多个标签用空格分隔）" 10 30 3>&1 1>&2 2>&3)
				background_url=$(whiptail --inputbox "输入图片 URL（可选）" 10 30 3>&1 1>&2 2>&3)

				while true; do
					filename=$(whiptail --inputbox "输入文件名（不含 '.md'）" 10 30 3>&1 1>&2 2>&3)
					if [ -n "$filename" ]; then
						break
					else
						whiptail --msgbox "文件名不能为空，请重新输入。" 10 30
					fi
				done
			fi
		fi
	done

	year=$(date +%Y)
	mkdir -p "$BLOG_DIR/$year"
	file_path="$BLOG_DIR/$year/$filename.md"

	# 生成文章头部
	frontmatter="---
title: '$title'
descriptions: '$description'
date: '$(date +%Y-%m-%d)'
"
	if [ -n "$background_url" ]; then
		frontmatter+="image: '$background_url'
"
	fi
	# 检查 tags 是否为空
	if [ -n "$tags" ]; then
		frontmatter+="tags:
$(for tag in $tags; do echo "    - $tag"; done)
"
	fi
	frontmatter+="---
"

	echo "$frontmatter" >"$file_path"

	$BlogEditor "$file_path"

	if whiptail --yesno "是否确定保存修改？" 10 30; then
		whiptail --msgbox "文章已保存。" 10 30
	else
		rm -f "$file_path"
		whiptail --msgbox "文章已取消保存。" 10 30
	fi

	main_menu
}
# 启动主菜单
main_menu
