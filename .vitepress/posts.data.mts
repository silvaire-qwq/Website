import { createContentLoader } from "vitepress";

interface Post {
  tags: string[];
  title: string;
  url: string;
  image: string;
  descriptions: string;
  date: {
    time: number;
    string: string;
  };
}

interface Data {
  yearMap: Record<string, string[]>;
  recentPosts: Post[];
  postMap: Record<string, Post>;
  tagMap: Record<string, Post[]>;
}

declare const data: Data;

export { data };

export default createContentLoader("/src/blogs/*/*.md", {
  transform(raw): Data {
    const postMap: Record<string, Post> = {};
    const yearMap: Record<string, string[]> = {};
    const tagMap: Record<string, Post[]> = {};

    const posts = raw
      .map(({ url, frontmatter }) => {
        const result: Post = {
          tags: frontmatter.tags || [],
          title: frontmatter.title,
          url,
          image: frontmatter.image,
          descriptions: frontmatter.descriptions,
          date: formatDate(frontmatter.date),
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => b.date.time - a.date.time);

    posts.forEach((item) => {
      const year = new Date(item.date.time).getFullYear().toString();
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item.url);

      item.tags.forEach((tag) => {
        if (!tagMap[tag]) {
          tagMap[tag] = [];
        }
        tagMap[tag].push(item);
      });
    });

    return {
      yearMap,
      recentPosts: posts,
      postMap,
      tagMap,
    };
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);

  // 获取星期、日期、月份和年份
  const day = date.toLocaleString("en-GB", { day: "2-digit" }) + ","; // "06,"
  const month = date.toLocaleString("en-GB", { month: "short" }); // "Mar"
  const year = `${date.getFullYear()}`; // "(2025)"

  // 拼接成目标格式
  const formattedDate = `${month} ${day} ${year}`;

  return {
    time: date.getTime(),
    string: formattedDate,
  };
}
