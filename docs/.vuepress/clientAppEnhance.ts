import { defineClientAppEnhance } from '@vuepress/client'
import TippyVue from '../../src/main'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(TippyVue)
})
