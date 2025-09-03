import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import strip from "strip-markdown";

const postsDir = path.resolve("./src/content/posts");
const outputDir = path.resolve("./src/config");
const outputFile = path.join(outputDir, "posts.ts");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const posts = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith(".md")) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      if (data.draft) continue;

      const relativePath = path.relative(postsDir, fullPath);
      const urlPath = "/posts/" + relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

      const textContent = remark().use(strip).processSync(content).toString();

      posts.push({
        url: urlPath,
        title: data.title || "",
        description: data.description || "",
        content: textContent,
      });
    }
  }
}

walkDir(postsDir);

// 输出 TS 文件，前面加 const postData =
const tsContent = `export const postData = ${JSON.stringify(posts, null, 2)} as const;\n`;

fs.writeFileSync(outputFile, tsContent, "utf-8");
console.log(`Generated ${posts.length} posts data to ${outputFile}.`);
