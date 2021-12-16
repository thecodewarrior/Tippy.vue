import { defineClientAppEnhance } from '@vuepress/client'
import {TippyPlugin} from '../../src'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(TippyPlugin)
})
