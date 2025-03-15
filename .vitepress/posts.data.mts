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
  category: string;
  pin?: boolean;
  modify?: string;
}

interface Data {
  yearMap: Record<string, string[]>;
  recentPosts: Post[];
  postMap: Record<string, Post>;
  tagMap: Record<string, Post[]>;
  categoryMap: Record<string, Post[]>;
}

declare const data: Data;

export { data };

export default createContentLoader("/src/blogs/*/*.md", {
  transform(raw): Data {
    const postMap: Record<string, Post> = {};
    const yearMap: Record<string, string[]> = {};
    const tagMap: Record<string, Post[]> = {};
    const categoryMap: Record<string, Post[]> = {};

    const posts = raw
      .map(({ url, frontmatter }) => {
        const result: Post = {
          tags: frontmatter.tags || [],
          title: frontmatter.title,
          url,
          image: frontmatter.image,
          descriptions: frontmatter.descriptions,
          date: formatDate(
            frontmatter.modify || frontmatter.date,
            !!frontmatter.modify
          ),
          category: frontmatter.category || "Uncategorized",
          pin: frontmatter.pin || false,
          modify: frontmatter.modify,
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => {
        if (a.pin && !b.pin) return -1;
        if (!a.pin && b.pin) return 1;
        return b.date.time - a.date.time;
      });

    posts.forEach((item) => {
      const year = item.pin
        ? "9999"
        : new Date(item.date.time).getFullYear().toString();
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

      if (!categoryMap[item.category]) {
        categoryMap[item.category] = [];
      }
      categoryMap[item.category].push(item);
    });

    return {
      yearMap,
      recentPosts: posts,
      postMap,
      tagMap,
      categoryMap,
    };
  },
});

function formatDate(raw: string, isModified: boolean): Post["date"] {
  const date = new Date(raw);

  // 获取星期、日期、月份和年份
  const day = date.toLocaleString("zh-CN", { day: "2-digit" });
  const month = date.toLocaleString("zh-CN", { month: "short" });
  const year = `${date.getFullYear()}`;

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let displayDate;
  if (diffDays === 0) {
    displayDate = isModified ? "最后修改于今天" : "今天";
  } else if (diffDays === 1) {
    displayDate = isModified ? "最后修改于昨天" : "昨天";
  } else if (diffDays === 2) {
    displayDate = isModified ? "最后修改于前天" : "前天";
  } else if (date.getFullYear() === now.getFullYear()) {
    displayDate = isModified ? `最后修改于${month}${day}` : `${month}${day}`;
  } else {
    displayDate = isModified
      ? `最后修改于${year}年${month}${day}`
      : `${year}年${month}${day}`;
  }

  return {
    time: date.getTime(),
    string: displayDate,
  };
}