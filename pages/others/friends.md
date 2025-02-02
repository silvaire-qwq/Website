---
layout: home
title: 朋友们
footer: false
---

<script setup>
  import { default as webConfig } from "../../config.json";
</script>

<div class="friends">
  <FriendCard 
   title="LeonXie"
   url="https://leonxie.cn/" 
   description="保持热爱，奔赴山海！" 
   logo="https://avatars.githubusercontent.com/u/128591764?v=4" 
  />
  <FriendCard 
   title="Ariasaka"
   url="https://blog.yaria.top/" 
   description="人有悲欢离合，月有阴晴圆缺。" 
   logo="https://bu.dusays.com/2024/10/28/671f8bf00317e.jpg" 
  />
  <FriendCard 
   title="GenshinImpact.Net"
   url="https://genshinimpact.net/" 
   description="这里是一张起始页" 
   logo="https://genshinimpact.net/img/yuanshen_logo.jpg" 
  />
  <FriendCard 
   title="Kevin Wang"
   url="https://www.pluskevin.com/blog/" 
   description="记录我的IT学习历程、我的软件开发学习！" 
   logo="https://cdn.luogu.com.cn/upload/usericon/1.png" 
  />
  <FriendCard 
   title="CE-RAMOS"
   url="https://ce-ramos.cn/" 
   description="一款致力于模仿原版系统界面且功能强大的PE。" 
   logo="https://docs.ce-ramos.cn/Logo.png" 
  />
  <FriendCard 
   title="青稚"
   url="https://blog.linux-qitong.top/" 
   description="越努力，越幸运。" 
   logo="https://blog.linux-qitong.top/img/avatar.avif" 
  />
  <FriendCard 
   title="张洪 Heo"
   url="https://blog.zhheo.com/" 
   description="分享设计与科技生活。" 
   logo="https://bu.dusays.com/2022/12/28/63ac2812183aa.png" 
  />
</div>

<br><br>

---

<br>

# 添加友情链接

<br>

## 我的信息

| 名称 | 头像 | 描述 | 网址 |
| --- | --- | --- | --- |
| <span v-text="webConfig.author"></span> | <a :href="webConfig.logo">复制链接</a> | <span v-text="webConfig.description"></span> | <span v-text="webConfig.url"></span> |

## 要求

- 网站在中国大陆境内可以在 40 秒内访问
- 不存在违法违规行为
- 已经挂上了 <span v-text="webConfig.author"></span>
- 有 3 篇或更多的原创文章

## 审核

如果您符合条件，请将网站名、头像、简介和网址发送至 <code v-text="webConfig.mail"></code>，等待审核。

## 提醒事项

- 如果您违反要求，我会删除您的链接。
- 您申请的信息可能会被简化，例如只留下您的昵称，删掉 "空间" 等字符。