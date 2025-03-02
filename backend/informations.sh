#!/bin/bash

export REAL_ROOT="$(realpath $(dirname $0)/..)"

# 定义配置文件路径
CONFIG_FILE="$REAL_ROOT/src/configs/config.json"

# 检查配置文件是否存在
check_config_file() {
    if [ ! -f "$CONFIG_FILE" ]; then
        whiptail --msgbox "配置文件 $CONFIG_FILE 不存在。" 10 30
        return 1
    fi
    return 0
}

# 修改配置的函数
modify_config() {
    # 读取配置文件内容
    config=$(cat "$CONFIG_FILE")

    # 提取各个字段的值
    title=$(echo "$config" | jq -r '.title')
    desc=$(echo "$config" | jq -r '.desc')
    avatar=$(echo "$config" | jq -r '.avatar')
    github=$(echo "$config" | jq -r '.github')
    link=$(echo "$config" | jq -r '.link')

    # 从 GitHub 链接中提取用户名
    github_username=$(basename "$github")

    # 展示当前信息
    info="[标题] 
$title

[描述] 
$desc

[头像链接] 
$avatar

[GitHub 用户名] 
$github_username

[网站链接]
$link"

    whiptail --title "当前信息预览" --msgbox "$info" 20 60

    # 询问是否继续
    if ! whiptail --yesno "是否继续进行设置？" 10 30; then
        return
    fi

    # 列出可设置的选项
    options=("title" "标题" "desc" "描述" "avatar" "头像链接" "github" "GitHub 用户名" "link" "网站链接")
    selected_option=$(whiptail --title "选择要设置的项" --menu "请选择要设置的项" 15 60 5 "${options[@]}" 3>&1 1>&2 2>&3)

    # 获取当前对应字段的值
    current_value=""
    if [ "$selected_option" = "github" ]; then
        current_value=$github_username
    else
        eval "current_value=\$$selected_option"
    fi

    # 获取用户输入的新值
    new_value=""
    new_display_value="" # 用于显示的新值，github 显示用户名
    if [ "$selected_option" = "github" ]; then
        new_value=$(whiptail --inputbox "请输入新的 GitHub 用户名" 10 30 3>&1 1>&2 2>&3)
        new_display_value=$new_value
        if [ -n "$new_value" ]; then
            new_value="https://github.com/$new_value"
        fi
    else
        # 找到 selected_option 在 options 数组中的索引
        for i in "${!options[@]}"; do
            if [ "${options[$i]}" = "$selected_option" ]; then
                index=$((i + 1))
                break
            fi
        done
        new_value=$(whiptail --inputbox "请输入新的 ${options[$index]}" 10 30 3>&1 1>&2 2>&3)
        new_display_value=$new_value
    fi

    # 检查输入是否为空或与原内容相同
    if [ -z "$new_display_value" ] || [ "$new_display_value" = "$current_value" ]; then
        whiptail --msgbox "输入为空或与原内容相同，更改已取消。" 10 30
        return
    fi

    # 找到选项对应的中文描述
    for i in "${!options[@]}"; do
        if [ "${options[$i]}" = "$selected_option" ]; then
            option_desc="${options[$((i + 1))]}"
            break
        fi
    done

    # 询问是否保存
    if whiptail --yesno "您正在将$option_desc的值设置为$new_display_value，请问是否继续？" 10 30; then
        # 使用 jq 更新 JSON 文件
        new_config=$(echo "$config" | jq --arg key "$selected_option" --arg value "$new_value" '.[$key] = $value')
        echo "$new_config" >"$CONFIG_FILE"
        whiptail --msgbox "配置已保存。" 10 30
    else
        whiptail --msgbox "修改未保存。" 10 30
    fi
}

# 主界面循环
while true; do
    if ! check_config_file; then
        break
    fi
    choice=$(whiptail --title "个人信息修改" --menu "请选择操作" 15 60 2 \
        "E" "修改、预览配置" \
        "Q" "退出" 3>&1 1>&2 2>&3)
    case $choice in
    E)
        modify_config
        ;;
    Q)
        break
        ;;
    *)
        break
        ;;
    esac
done
