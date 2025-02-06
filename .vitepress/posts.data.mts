import { createContentLoader } from "vitepress";

interface Post {
  emoji: string;
  title: string;
  url: string;
  descriptions: string;
  date: {
    time: number;
    string: string;
  };
}

interface RencentPost extends Post {}

interface data {
  yearMap: unknown;
  recentPosts: RencentPost[];
  postMap: unknown;
  emojiMap: Record<string, Post[]>; // 添加 emojiMap 字段
}

declare const data: data;

export { data };

export default createContentLoader("/src/blogs/*/*.md", {
  transform(raw): data {
    const postMap = {};
    const yearMap = {};
    const emojiMap: Record<string, Post[]> = {}; // 初始化 emojiMap

    const posts = raw
      .map(({ url, frontmatter }) => {
        const result = {
          emoji: frontmatter.emoji,
          title: frontmatter.title,
          url,
          descriptions: frontmatter.descriptions,
          date: formatDate(frontmatter.date),
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => b.date.time - a.date.time);

    posts.forEach((item) => {
      const year = new Date(item.date.string).getFullYear();
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item.url);

      // 按 emoji 分类
      if (!emojiMap[item.emoji]) {
        emojiMap[item.emoji] = [];
      }
      emojiMap[item.emoji].push(item);
    });

    return {
      yearMap,
      recentPosts: posts,
      postMap,
      emojiMap, // 返回 emojiMap
    };
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return {
    time: +date,
    string: `${year}-${month}-${day}`,
  };
}
