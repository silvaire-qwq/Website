import { createContentLoader } from "vitepress";

interface Post {
  title: string;
  url: string;
  description: string;
  date: {
    time: number;
    string: string;
  };
  img: string;
}

interface RencentPost extends Post {
  tags?: string[];
}

interface data {
  yearMap: unknown;
  recentPosts: RencentPost[];
  postMap: unknown;
  tagMap: unknown;
}

declare const data: Post[];
export { data };

export default createContentLoader("posts/*.md", {
  transform(raw): data {
    const postMap = {};
    const yearMap = {};
    const tagMap = {};
    const posts = raw
      .map(({ url, frontmatter }) => {
        let tags = []  
        if (frontmatter?.tags) {
          tags = [...tags, ...frontmatter.tags];
        } 
        const result = {
          title: frontmatter.title,
          url,
          description: frontmatter.description,
          date: formatDate(frontmatter.clock),
          img: frontmatter.img,
          tags
          //md: getTime(frontmatter.date),
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => b.date.time - a.date.time);

    const recentPosts = posts.slice(0, 999999).map((item) => ({ ...item }));

    posts.forEach((item) => {
      const year = new Date(item.date.string).getFullYear();
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item.url);

      item.tags.forEach((tag) => {
        if(!tagMap[tag]){
          tagMap[tag] = []
        }
      })
    });

    return {
      yearMap,
      recentPosts,
      postMap,
      tagMap
    };
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始，需要加 1
  const day = date.getDate().toString().padStart(2, "0");
  return {
    time: +date,
    string: `${year}-${month}-${day}`,
  };
}
