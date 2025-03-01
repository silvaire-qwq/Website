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

  // 定义选项
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };

  // 使用 Intl.DateTimeFormat 格式化日期
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  let formattedDate = formatter.format(date);

  // 手动在星期和月份缩写后添加句点
  formattedDate = formattedDate
    .replace(/(\w{3}),/, "$1.") // 在星期缩写后添加句点
    .replace(/(\w{3}) (\d{2}) (\w{3})/, "$1. $2 $3."); // 在月份缩写后添加句点

  return {
    time: date.getTime(),
    string: formattedDate,
  };
}
