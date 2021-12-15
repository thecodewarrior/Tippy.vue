import { defineClientAppEnhance } from '@vuepress/client'
import TippyVue from '../../src'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(TippyVue)
})
