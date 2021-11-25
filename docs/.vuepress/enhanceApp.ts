import { defineClientAppEnhance } from '@vuepress/client'
import TippyVue from '@/main.ts'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(TippyVue)
})
