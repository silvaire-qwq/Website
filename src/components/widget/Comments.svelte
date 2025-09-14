<section>
  <script src="https://giscus.app/client.js"
    data-repo={commentConfig.giscus.repo}
    data-repo-id={commentConfig.giscus.repoId}
    data-category={commentConfig.giscus.category}
    data-category-id={commentConfig.giscus.categoryId}
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="0"
    data-emit-metadata="0"
    data-input-position="top"
    data-theme={detectGiscusTheme()}
    data-lang="zh-CN"
    data-loading="lazy"
    crossorigin="anonymous"
    async>
  </script>
</section>

<script>
import { commentConfig } from '@/config'

function detectGiscusTheme() {
  return document.documentElement.classList.contains('dark') ? 'noborder_gray' : 'noborder_light'
}

function updateGiscusTheme() {
  const iframe = document.querySelector('iframe.giscus-frame')
  if (!iframe) return
  const theme = detectGiscusTheme()
  iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
}

const observer = new MutationObserver(updateGiscusTheme)
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

window.onload = () => {
  updateGiscusTheme()
}
</script>

<style scoped>
  section {
    background: var(--card-bg);
    border-radius: var(--radius-large);
    padding: 36px;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 767px) {
    section { margin-bottom: 14px; }
  }
</style>