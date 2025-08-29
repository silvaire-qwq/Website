<template>
  <div v-if="loading" class="last-moment">Loading last commit...</div>
  <div v-else-if="error" class="last-moment error">{{ error }}</div>
  <div
    v-else
    class="last-moment"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="content">
      <span class="content">{{ lastCommit?.message }}</span>
      <span class="datetime" v-if="lastCommit?.date"
        >{{ formatRelativeDate(lastCommit?.date || "") }} at {{ lastCommit?.repo || "" }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { globalConfig } from "../../../config";
import { formatRelativeDate } from "../../utils/formatRelativeDate";

interface CommitMoment {
  date: string; // ISO 时间字符串
  message: string; // commit message
  repo: string; // 仓库名
}

const username = globalConfig.github; // GitHub 用户名
const CACHE_KEY = "github_last_commit_cache";
const CACHE_TTL = 60 * 60 * 1000; // 1小时

const lastCommit = ref<CommitMoment | null>(null);
const loading = ref(true);
const error = ref("");

const maxMove = 12;
const easing = 0.1;
const cardStates = new WeakMap<HTMLElement, any>();

// --------------------鼠标动画--------------------
const handleMouseMove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const targetX = ((x - centerX) / centerX) * maxMove;
  const targetY = ((y - centerY) / centerY) * maxMove;

  if (!cardStates.has(el)) {
    cardStates.set(el, {
      currentX: 0,
      currentY: 0,
      targetX,
      targetY,
      hovered: false,
    });
    animateCard(el);
  } else {
    const state = cardStates.get(el);
    state.targetX = targetX;
    state.targetY = targetY;
  }
};

const resetTransform = (e: Event) => {
  const el = e.currentTarget as HTMLElement;
  if (!cardStates.has(el)) return;
  const state = cardStates.get(el);
  state.targetX = 0;
  state.targetY = 0;
};

const handleMouseEnter = (e: Event) => {
  const el = e.currentTarget as HTMLElement;
  if (!cardStates.has(el)) {
    cardStates.set(el, {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      hovered: true,
    });
    animateCard(el);
  } else {
    cardStates.get(el).hovered = true;
  }
};

const handleMouseLeave = (e: Event) => {
  const el = e.currentTarget as HTMLElement;
  if (!cardStates.has(el)) return;
  const state = cardStates.get(el);
  state.hovered = false;
  resetTransform(e);
};

const animateCard = (el: HTMLElement) => {
  const state = cardStates.get(el);
  if (!state) return;

  const { currentX, currentY, targetX, targetY, hovered } = state;
  const nextX = currentX + (targetX - currentX) * easing;
  const nextY = currentY + (targetY - currentY) * easing;
  state.currentX = nextX;
  state.currentY = nextY;

  const scale = hovered ? 1.03 : 1;
  el.style.transform = `translate(${nextX}px, ${nextY}px) scale(${scale})`;

  requestAnimationFrame(() => animateCard(el));
};

// --------------------获取 GitHub 最新 commit--------------------
async function fetchLastCommit(): Promise<CommitMoment | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error("GitHub API request failed");
    const repos = await res.json();
    if (!repos || repos.length === 0) return null;

    const commitsList = await Promise.all(
      repos
        .filter((repo: any) => !repo.archived)
        .map(async (repo: any) => {
          try {
            const commitsRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`
            );
            const commits = await commitsRes.json();
            if (!commits || commits.length === 0) return null;
            const commit = commits[0].commit;
            return {
              date: commit.author.date,
              message: commit.message,
              repo: repo.name,
            } as CommitMoment;
          } catch {
            return null;
          }
        })
    );

    const validCommits = commitsList.filter(Boolean) as CommitMoment[];
    if (validCommits.length === 0) return null;

    validCommits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return validCommits[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

// --------------------缓存加载逻辑--------------------
async function loadLastCommit() {
  loading.value = true;

  let cache = localStorage.getItem(CACHE_KEY);
  let cacheTime = localStorage.getItem(CACHE_KEY + "_time");
  let data: CommitMoment | null = null;

  if (cache && cacheTime && Date.now() - Number(cacheTime) < CACHE_TTL) {
    try {
      data = JSON.parse(cache);
      lastCommit.value = data;
      loading.value = false;
      return;
    } catch {}
  }

  try {
    data = await fetchLastCommit();
    if (data) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_KEY + "_time", Date.now().toString());
      lastCommit.value = data;
    } else {
      error.value = "Nothing found";
    }
  } catch (e: any) {
    if (cache) {
      try {
        lastCommit.value = JSON.parse(cache);
      } catch {}
    } else {
      error.value = e.message;
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadLastCommit();
});
</script>

<style scoped>
.last-moment {
  margin-bottom: var(--vp-gap);
  font-size: 1rem;
  display: flex;
  gap: var(--vp-gap);
  border-radius: var(--vp-border-radius-1);
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  transition: all var(--vp-transition-time);
  will-change: transform;
  padding: 15px 20px;
  box-shadow: var(--vp-shadow);
  text-decoration: none;
  overflow: hidden;
  justify-content: center;
}
.last-moment:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-brand);
}
.datetime {
  color: var(--vp-c-text-3);
  margin-left: 10px;
  opacity: 0.8;
}
span.content {
  text-transform: uppercase;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
}
</style>
