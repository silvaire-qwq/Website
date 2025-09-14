import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import strip from "strip-markdown";

/* ---------------------- POSTS GENERATION ---------------------- */

const postsDir = path.resolve("./src/content/posts");
const outputDir = path.resolve("./src/config");
const postsOutputFile = path.join(outputDir, "posts.ts");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const posts = [];

/**
 * Recursively walk through directory to read Markdown files
 * @param {string} dir - directory to walk
 */
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
        fileName: file,
        url: urlPath,
        title: data.title || "",
        description: data.description || "",
        published: data.published || "",
        content: textContent || "",
      });
    }
  }
}

walkDir(postsDir);

/* Output posts.ts */
const postsTsContent = `export const postData = ${JSON.stringify(posts, null, 2)} as const;\n`;
fs.writeFileSync(postsOutputFile, postsTsContent, "utf-8");

/* ---------------------- FRIENDS GENERATION ---------------------- */

const friendsDir = path.resolve("./src/config/friends");
const friendsOutputFile = path.join(outputDir, "friend.ts");

const friendFiles = fs.existsSync(friendsDir)
  ? fs.readdirSync(friendsDir).filter(f => f.endsWith(".json"))
  : [];

const links = friendFiles.map(file => {
  const data = JSON.parse(fs.readFileSync(path.join(friendsDir, file), "utf-8"));
  return {
    fileName: file,
    title: data.title,
    link: data.link,
    desc: data.desc,
    img: data.img,
  };
});

const friendsTsContent = `export const links: { fileName: string; title: string; link: string; desc: string; img: string }[] = [
${links
  .map(
    l => `  {
    fileName: "${l.fileName}",
    title: "${l.title}",
    link: "${l.link}",
    desc: "${l.desc}",
    img: "${l.img}",
  }`
  )
  .join(",\n")}
];\n`;

fs.writeFileSync(friendsOutputFile, friendsTsContent, "utf-8");

/* ---------------------- MOMENTS GENERATION ---------------------- */

const momentsDir = path.resolve("./src/config/moments");
const momentsOutputFile = path.join(outputDir, "moment.ts");

const momentFiles = fs.existsSync(momentsDir)
  ? fs.readdirSync(momentsDir).filter(f => f.endsWith(".json"))
  : [];

// Sort by filename for chronological order
momentFiles.sort();

const momentsData = momentFiles.map(file => {
  const data = JSON.parse(fs.readFileSync(path.join(momentsDir, file), "utf-8"));
  return {
    fileName: file,
    date: data.date,
    time: data.time,
    content: data.content,
  };
});

const momentsTsContent = `export const momentsData: { fileName: string; date: string; time: string; content: string }[] = [
${momentsData
  .map(
    m => `  {
    fileName: "${m.fileName}",
    date: "${m.date}",
    time: "${m.time}",
    content: "${m.content.replace(/"/g, '\\"')}",
  }`
  )
  .join(",\n")}
];\n`;

fs.writeFileSync(momentsOutputFile, momentsTsContent, "utf-8");

/* ---------------------- LOGS ---------------------- */

console.log(`Generated ${posts.length} posts data to ${postsOutputFile}.`);
console.log(`Generated ${links.length} friends data to ${friendsOutputFile}.`);
console.log(`Generated ${momentsData.length} moments data to ${momentsOutputFile}.`);
