import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";

export const siteConfig: SiteConfig = {
  title: "Silvaire's Blog",
  subtitle: "生如夏花之绚烂，死如秋叶之静美。",
  lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  domain: ["https://qwq.blue"],
  warnLink: "https://warn.qwq.blue",
  editPost: {
    enable: true,
    repo: "silvaire-qwq/Website",
  },
  dateCreated: "2024-08-23",
  themeColor: {
    hue: 285, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: "assets/images/banner/image.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false, // Display the credit text of the banner image
      text: "", // Credit text to be displayed
      url: "", // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    // Leave this array empty to use the default favicon
    {
      src: "https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508&mask=circle", // Path of the favicon, relative to the /public directory
      //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    },
  ],
};

export const navBarConfig: NavBarConfig = {
  links: [
    {
      icon: "material-symbols:home-outline-rounded",
      name: "主页",
      url: "/",
    },
    { 
      icon: "material-symbols:folder-outline-rounded",
      name: "文章",
      items: [
        {
          icon: "material-symbols:archive-outline-rounded",
          name: "归档",
          url: "/archive/",
        },
        {
          icon: "material-symbols:calendar-today-outline",
          name: "动态",
          url: "/moments/",
        },
      ]
    },
    {
      icon: "material-symbols:info-outline-rounded",
      name: "杂项",
      items: [
    {
      icon: "material-symbols:link-rounded",
      name: "友链",
      url: "/links/",
    },
    {
      icon: "material-symbols:id-card-outline-rounded",
      name: "关于",
      url: "/about/",
    },
    //{
    //  icon: "material-symbols:dashboard-outline",
    //  name: "仪表盘",
    //  url: "/dashboard/",
    //}
  ]},
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "Silvaire",
  bio: "一个平凡的普通人。",
  links: [
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/silvaire-qwq",
    },
    {
      name: "Mail",
      icon: "material-symbols:mail",
      url: "mailto:mail@qwq.blue",
    },
    {
      name: "RSS",
      icon: "fa6-solid:rss",
      url: "/rss.xml",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const giscusConfig = {
  // generate from https://giscus.app/
  repo: "silvaire-qwq/Website",
  repoId: "R_kgDONDiNmg",
  category: "Announcements",
  categoryId: "DIC_kwDONDiNms4CkxsX",
};