---
layout: home
footer: false
title: "Friends"
icon: fluent:animal-cat-16-regular
desc: "好耶！是朋友们！"
pageClass: friendLink
---
<script setup>
  import { default as webConfig } from "/src/configs/config.json";
</script>

<script>
import friendsData from '/src/configs/friends.json';  // 导入 JSON

export default {
  data() {
    return {
      friends: friendsData.reduce((acc, category) => {
        const categoryName = category.category || "朋友";
        acc[categoryName] = category.items.map(friend => ({
          ...friend,
          logo: friend.logo || 'https://cdn.luogu.com.cn/upload/usericon/1.png'
        }));
        return acc;
      }, {}),
    };
  },
};
</script>

<style scoped>
h1 {
  user-select: none;
}

div.friendLink {
  div.friends {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 居中对齐 */
    gap: 10px;
  }
  div.category {
    margin-bottom: 100px;
  }
  h1.category {
    text-align: center;
    font-size: 80px;
    line-height: 80px;
    color: transparent;
    -webkit-text-stroke: 1px var(--vp-c-gutter);
    margin-bottom: -35px;
    z-index: -1;
  }
  .friend-card {
    flex: 1 1 250px; /* 确保卡片在小屏幕上也能正常显示 */
    max-width: 1200px;
  }
}
</style>

<spacer height="40px"/>
<pt />
<div class="allFriend">
  <div v-for="(friends, category) in friends" :key="category" class="category">
    <!--<h1 class="category">{{ category }}</h1>-->
    <div class="friends">
      <div v-for="friend in friends" :key="friend.url" class="friend-card">
        <FriendCard 
          :title="friend.title"
          :url="friend.url"
          :description="friend.description"
          :logo="friend.logo"
        />
      </div>
    </div>
  </div>
</div>

<br><br>

---

## 添加友情链接

### 您需要做什么

如要添加友链，请向本站 [GitHub Repo](https://github.com/silvaire-qwq/Website) 发起一个 Issue。在这之前，您需要添加我的友情链接。

#### 我的信息

| 名字                                   | 描述                                  | 头像                                     | 链接                                  |
| -------------------------------------- | ------------------------------------- | ---------------------------------------- | ------------------------------------- |
| <span v-text="webConfig.title"></span> | <span v-text="webConfig.desc"></span> | <a :href="webConfig.logo">请复制链接</a> | <span v-text="webConfig.link"></span> |

#### 必须包含

- 昵称/网站名
- 网站链接
- 简介/格言

#### 可以不包含

- 网站头像 **_(如果不包含网站头像，您的网站头像会被替换为[洛谷的默认头像](https://cdn.luogu.com.cn/upload/usericon/1.png)。)_**

#### 禁止的网站

- 包含违反中国法律法规的内容的；
- 没有任何原创文章的；
- 包含吹牛、不切实际的文章的；
- 三个月不更新网站的；
- 死链；
- 单方面删除友情链接的
> 如果您的网站添加友情链接后违反了上述规定，我将立即删除您的友情链接，并永远不会再次添加。

