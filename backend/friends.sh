#!/bin/bash

# 设置文件路径
REAL_ROOT=$(realpath $(dirname $0)/..)
FRIENDS_FILE="$REAL_ROOT/src/configs/friends.json"

while true; do
	# 检查 JSON 文件是否存在
	if [ ! -f "$FRIENDS_FILE" ]; then
		whiptail --title "错误" --msgbox "友情链接文件不存在：$FRIENDS_FILE" 10 60
		exit 1
	fi

	# 读取 JSON 文件内容
	friends=$(cat "$FRIENDS_FILE")

	# 获取友情链接数量
	friend_count=$(echo "$friends" | jq '. | length')

	# 构建选项列表
	options=()
	for i in $(seq 1 "$friend_count"); do
		index=$((i - 1))
		title=$(echo "$friends" | jq -r ".[$index].title")
		options+=("$i" "$title")
	done

	# 添加管理选项
	options+=("" "")
	options+=("A" "添加新友情链接")
	options+=("Q" "退出")

	# 显示菜单
	choice=$(whiptail --title "友情链接管理" --menu "选择一个操作：" 20 60 10 "${options[@]}" 3>&1 1>&2 2>&3)

	# 处理退出选项
	if [ "$choice" == "Q" ]; then
		exit 0
	elif [ "$choice" == "A" ]; then
		# 添加新友情链接
		title=$(whiptail --inputbox "输入标题：" 10 60 3>&1 1>&2 2>&3)
		url=$(whiptail --inputbox "输入URL：" 10 60 3>&1 1>&2 2>&3)
		description=$(whiptail --inputbox "输入描述：" 10 60 3>&1 1>&2 2>&3)
		logo=$(whiptail --inputbox "输入Logo URL：" 10 60 3>&1 1>&2 2>&3)

		# 检查所有字段是否均为空
		if [[ -z "$title" && -z "$url" && -z "$description" && -z "$logo" ]]; then
			whiptail --title "错误" --msgbox "所有字段均为空或未修改，未添加新链接。" 10 60
			continue
		fi

		# 确认添加
		if whiptail --title "确认添加" --yesno "[标题]\n$title\n[URL]\n$url\n[描述]\n$description\n[Logo]\n$logo" 20 80; then
			new_friend=$(jq -n \
				--arg title "$title" \
				--arg url "$url" \
				--arg description "$description" \
				--arg logo "$logo" \
				'{title: $title, url: $url, description: $description, logo: $logo}')
			updated_friends=$(echo "$friends" | jq ". += [$new_friend]")
			echo "$updated_friends" >"$FRIENDS_FILE"
			friends="$updated_friends"
			whiptail --title "成功" --msgbox "已添加新友情链接：$title" 10 60
		else
			whiptail --title "信息" --msgbox "已取消添加操作。" 10 60
		fi

	elif [[ "$choice" =~ ^[0-9]+$ ]]; then
		index=$((choice - 1))
		friend=$(echo "$friends" | jq ".[$index]")
		title=$(echo "$friend" | jq -r ".title")
		url=$(echo "$friend" | jq -r ".url")
		description=$(echo "$friend" | jq -r ".description")
		logo=$(echo "$friend" | jq -r ".logo")

		action=$(whiptail --title "管理友情链接" --menu "选择操作：" 15 60 2 \
			"M" "修改" \
			"D" "删除" 3>&1 1>&2 2>&3)

		if [ "$action" == "M" ]; then
			new_title=$(whiptail --inputbox "修改标题：" 10 60 "$title" 3>&1 1>&2 2>&3)
			new_url=$(whiptail --inputbox "修改URL：" 10 60 "$url" 3>&1 1>&2 2>&3)
			new_description=$(whiptail --inputbox "修改描述：" 10 60 "$description" 3>&1 1>&2 2>&3)
			new_logo=$(whiptail --inputbox "修改Logo URL：" 10 60 "$logo" 3>&1 1>&2 2>&3)

			# 检查所有新字段是否均为空
			if [[ -z "$new_title" && -z "$new_url" && -z "$new_description" && -z "$new_logo" ]]; then
				# 弹出选项让用户选择取消或删除
				choice=$(whiptail --title "确认操作" --menu "所有字段均为空或未修改，请选择操作：" 15 60 2 \
					"C" "取消操作" \
					"D" "删除此链接" 3>&1 1>&2 2>&3)
				if [ "$choice" == "D" ]; then
					# 执行删除操作
					if whiptail --title "确认删除" --yesno "请确认是否删除以下友情链接：\n\n标题：$title\nURL：$url\n描述：$description\nLogo：$logo" 15 60; then
						updated_friends=$(echo "$friends" | jq "del(.[$index])")
						echo "$updated_friends" >"$FRIENDS_FILE"
						friends="$updated_friends"
						whiptail --title "成功" --msgbox "已删除友情链接：$title" 10 60
						# 退出当前循环处理，回到主菜单
						continue 2
					else
						whiptail --title "信息" --msgbox "已取消删除操作。" 10 60
					fi
				else
					whiptail --title "信息" --msgbox "操作已取消。" 10 60
				fi
				continue # 跳过后续处理
			fi

			# 检查是否未做任何修改
			if [[ "$new_title" == "$title" && "$new_url" == "$url" && "$new_description" == "$description" && "$new_logo" == "$logo" ]]; then
				whiptail --title "提示" --msgbox "未做任何修改，操作已取消。" 10 60
				continue
			fi

			if whiptail --title "确认修改" --yesno "请确认是否将友情链接修改为：\n\n标题：$new_title\nURL：$new_url\n描述：$new_description\nLogo：$new_logo" 15 60; then
				updated_friend=$(jq -n \
					--arg title "$new_title" \
					--arg url "$new_url" \
					--arg description "$new_description" \
					--arg logo "$new_logo" \
					'{title: $title, url: $url, description: $description, logo: $logo}')
				updated_friends=$(echo "$friends" | jq ".[$index] = $updated_friend")
				echo "$updated_friends" >"$FRIENDS_FILE"
				friends="$updated_friends"
				whiptail --title "成功" --msgbox "已修改友情链接：$new_title" 10 60
			else
				whiptail --title "信息" --msgbox "已取消修改操作。" 10 60
			fi

		elif [ "$action" == "D" ]; then
			if whiptail --title "确认删除" --yesno "请确认是否删除以下友情链接：\n\n标题：$title\nURL：$url\n描述：$description\nLogo：$logo" 15 60; then
				updated_friends=$(echo "$friends" | jq "del(.[$index])")
				echo "$updated_friends" >"$FRIENDS_FILE"
				friends="$updated_friends"
				whiptail --title "成功" --msgbox "已删除友情链接：$title" 10 60
			else
				whiptail --title "信息" --msgbox "已取消删除操作。" 10 60
			fi
		fi
	fi
done
