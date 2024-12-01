---
layout: home
title: 朋友们
---

<br>

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
   logo="https://ce-ramos.cn/Logo.png" 
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

::: details 和我成为朋友吧！
## 1. 我的信息
### 名称
silvaire_qwq
### 头像
[右键-复制链接地址](https://imgbed.lunars.site/file/1732958150105_IMG_20241130_171502.jpg)
### 描述
Stay hungry, stay foolish.
### 网址
https://lunars.site 
## 2. 要求
- 网站在中国大陆境内可以在 40 秒内访问
- 不存在违法违规行为
- 已经挂上了 silvaire_qwq
- 有 3 篇或更多的原创文章
## 3. 审核
如果您符合条件，请将网站名、头像、简介和网址发送至 ```mail@lunars.site```，等待审核。
## 4. 提醒事项
- 如果您违反要求，我会删除您的链接。
- 您申请的信息可能会被简化，例如只留下您的昵称，删掉 "空间" 等字符。

:::

::: details 关于这个界面...
由于技术原因，这个界面是用纯 HTML (与 CSS) 实现的，所以更新很麻烦。
```html
<a class="friend-card" href="链接">
  <img src="头像"
/>
  <nameAndDescription>
    <name>名称</name>
    <description>描述</description>
  </nameAndDescription>
</a>
```

---

但那是以前了！现在只需要：
```vue
<FriendCard 
 title="名字"
 url="链接" 
 description="描述" 
 logo="头像" 
/>
```
:::