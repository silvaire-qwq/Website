import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import busuanzi from 'busuanzi.pure.js'

export default {
    extends: DefaultTheme,
    enhanceApp({ app, router }) {
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
    },
}