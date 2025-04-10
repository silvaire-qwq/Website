---
layout: home
footer: false
title: 'Music'
icon: fluent:music-note-2-16-filled
desc: "喜欢听的音乐"
pageClass: musicLink
---

<script setup>
  import { default as webConfig } from "/src/configs/config.json";
</script>

<script>
import musicData from '/src/configs/music.json';  // 导入 JSON

export default {
  data() {
    return {
      musicList: musicData.map(music => ({
        ...music,
        priority: music.priority === 'top' ? Number.MAX_SAFE_INTEGER : parseInt(music.priority) || 1
      })),  // 将 JSON 数据绑定到 Vue 的 data 中，并解析 priority
    };
  },
  computed: {
    groupedMusic() {
      const grouped = this.musicList.reduce((acc, music) => {
        (acc[music.singer] = acc[music.singer] || []).push(music);
        if (music.priority === Number.MAX_SAFE_INTEGER) {
          (acc['Pinned'] = acc['Pinned'] || []).push(music);
        }
        return acc;
      }, {});

      for (const singer in grouped) {
        grouped[singer].sort((a, b) => {
          if (b.priority !== a.priority) return b.priority - a.priority;
          if (a.album !== b.album) return a.album.localeCompare(b.album);
          return a.name.localeCompare(b.name);
        });
      }

      const orderedGrouped = {};
      ['Pinned', ...Object.keys(grouped).sort()].forEach(key => {
        if (grouped[key]) {
          orderedGrouped[key] = grouped[key];
        }
      });

      return orderedGrouped;
    },
  },
};
</script>

<style scoped>
h1 {
  user-select: none;
}

div.musicLink {
  div.music {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 居中对齐 */
    gap: 10px;
  }
  div.singer {
    margin-bottom: 100px;
  }
  h1.singer {
    text-align: center;
    font-size: 80px;
    line-height: 80px;
    color: transparent;
    -webkit-text-stroke: 1px var(--vp-c-gutter);
    margin-bottom: -35px;
    z-index: -1;
  }
  .music-card {
    flex: 1 1 250px; /* 确保卡片在小屏幕上也能正常显示 */
    max-width: 1200px;
  }
}
</style>

<spacer height="40px" />
<pt />

<div class="allMusic">
  <div v-for="(musics, singer) in groupedMusic" :key="singer" class="singer">
    <h1 class="singer">{{ singer }}</h1>
    <div class="music">
      <div v-for="music in musics" :key="music.name" class="music-card">
        <MusicCard 
          :name="music.name"
          :singer="music.singer"
          :album="music.album"
          :img="music.img"
        />
      </div>
    </div>
  </div>
</div>