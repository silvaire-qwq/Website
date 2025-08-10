import fs from "fs";

const body = process.env.ISSUE_BODY || "";

// 提取表单内容
const title = (body.match(/### 站点名称\s+(.+)/) || [])[1]?.trim();
const desc = (body.match(/### 站点简介\s+([\s\S]+?)\n### 站点地址/) || [])[1]?.trim() || "";
const link = (body.match(/### 站点地址\s+(.+)/) || [])[1]?.trim();
const img = (body.match(/### 站点头像\s+(.+)/) || [])[1]?.trim() || "";

// 检查必填项
if (!title || !link) {
  console.error("缺少必要字段（站点名称或站点地址）");
  process.exit(1);
}

const filePath = "src/friend.ts";
let content = fs.readFileSync(filePath, "utf8");

// 检查是否已存在该链接
if (content.includes(link)) {
  console.log("链接已存在，跳过");
  process.exit(0);
}

// 构造新对象
const newEntry = `  {
    title: "${title}",
    link: "${link}",
    desc: "${desc}",
    img: "${img}"
  },\n`;

// 在 "添加友情链接" 前插入
content = content.replace(
  /(\s+{\s+title:\s+"添加友情链接".+)/,
  `${newEntry}$1`
);

fs.writeFileSync(filePath, content, "utf8");
console.log(`已添加：${title}`);
