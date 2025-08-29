---
layout: home
footer: false
---

<script setup>
import { globalConfig } from "../../config.ts";

// 打乱数组的简单函数
function shuffle(array) {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const friends = shuffle(
  globalConfig.friends.map(friend => ({
    ...friend,
    img: friend.img || "https://pic2.zhimg.com/50/v2-cc1a32fcb444fc9d5e23f2ee078dc6e1_720w.jpg?source=1940ef5c",
  }))
);
</script>

<div style="height: 40px;"></div>
<div class="allFriend">
  <div class="friends">
    <!-- 遍历所有朋友 -->
    <div v-for="friend in friends" :key="friend.link" class="friend-card">
      <FriendCard 
        :title="friend.title"
        :link="friend.link"
        :desc="friend.desc"
        :img="friend.img"
        :blog="friend.blog"
      />
    </div><div class="friend-card">
      <FriendCard 
        title="添加友情链接"
        link="https://github.com/silvaire-qwq/Website/issues/new?template=add-link.yaml"
        desc="暂时无法自动添加，提交 Issue 后需要等待审核。"
        img="https://pic2.zhimg.com/50/v2-cc1a32fcb444fc9d5e23f2ee078dc6e1_720w.jpg?source=1940ef5c"
        blog="Issue"
      />
    </div>
  </div>
</div>

<style scoped>
    .friends {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
        gap: var(--vp-gap);
        }
</style>
