import type { UseHeadOptions } from '@unhead/vue'
import {
  computed,
  defineNuxtPlugin,
  useHead,
  useRoute,
} from '#imports'
import { titleCase } from 'scule'
import { withoutTrailingSlash } from 'ufo'

export default defineNuxtPlugin({
  name: 'nuxt-seo:fallback-titles',
  env: {
    islands: false,
  },
  setup() {
    const route = useRoute()
    const title = computed(() => {
      if (typeof route.meta?.title === 'string')
        return route.meta?.title
      // if no title has been set then we should use the last segment of the URL path and title case it
      const path = withoutTrailingSlash(route.path || '/')
      const lastSegment = path.split('/').pop()
      return lastSegment ? titleCase(lastSegment) : null
    })

    const minimalPriority: UseHeadOptions = {
      // give nuxt.config values higher priority
      tagPriority: 101,
    }

    useHead({ title: () => title.value }, minimalPriority)
  },
})
