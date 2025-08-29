import { momentList } from "./src/config/moment";
import { friendList } from "./src/config/friend";

export const globalConfig = {
  title: "Silvaire's Blog", // title
  description: "Per Aspera Ad Astra", // description
  favicon:
    "https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508&mask=circle", // favicon
  url: "https://qwq.blue", // main url

  // homepage setting
  homePage: {
    avatar: "https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508", // your avatar
    author: "Silvaire", // your name
    city: "Tianjin", // your location
    introduce:
      "A 13-year-old middle school student who is learning programming. Dreaming of becoming a pro. XD", // introduce your self

    // modules
    modules: {
      about: true, // about
      lastMoment: true, // last moment
      recentPosts: true, // recent posts
      githubLastStatus: true, // github last status
      projects: true, // projects
      techStack: false, // tech stack (very sloooooow)
      friends: true, // friends
    },

    // stacks (https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${stack.icon}/${stack.icon}-original.svg)
    stacks: [
      { name: "Arch Linux", icon: "archlinux" },
      { name: "CSS", icon: "css3" },
      { name: "HTML", icon: "html5" },
      { name: "Linux", icon: "linux" },
      { name: "Vue", icon: "vuejs" },
      { name: "JSON", icon: "json" },
      { name: "JavaScript", icon: "javascript" },
      { name: "PNPM", icon: "pnpm" },
      { name: "Visual Studio Code", icon: "vscode" },
      { name: "VSCodium", icon: "vscodium" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Vite", icon: "vitejs" },
      { name: "Vim", icon: "vim" },
      { name: "Neovim", icon: "neovim" },
      { name: "Windows", icon: "windows11" },
      { name: "Git", icon: "git" },
      { name: "NPM", icon: "npm" },
      { name: "Yarn", icon: "yarn" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Docker", icon: "docker" },
    ],
  },

  // image bed url
  // frontmatter: test.png = [https://your.site/path/to/]test.png
  // frontmatter: https://example.com/test.png => https://example.com/test.png
  // do not use https://xxxx !!!
  // plz use https://xxxx/ !!!!!
  imgBed: "https://dl.qwq.blue/",
  github: "silvaire-qwq", // your github username

  // navigation items
  nav: [
    { text: "Dashboard", link: "/" },
    { text: "Archive", link: "/src/pages/archive.md" },
    { text: "Moments", link: "/src/pages/moments.md" },
    { text: "Friends", link: "/src/pages/friends.md" },
  ],

  friends: friendList, // friends (edit it in config.d/friend.ts)
  moments: momentList, // moments (edit it in config.d/moment.ts)
};
