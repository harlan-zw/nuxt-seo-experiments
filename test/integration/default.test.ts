import { describe, expect, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const { resolve } = createResolver(import.meta.url)

process.env.NODE_ENV = 'production'

await setup({
  rootDir: resolve('../../playground'),
  build: true,
  server: true,
})

describe('default', () => {
  it('basic', async () => {
    // extract the <head>
    const html = await $fetch('/')
    const head = html.match(/<head>([\s\S]*)<\/head>/)?.[1]
    // remove all style tags
    const headWithoutStyles = head?.replace(/<style[\s\S]*?<\/style>/g, '')
    const headWithoutScripts = headWithoutStyles?.replace(/<script[\s\S]*?<\/script>/g, '')
    const headWithoutLinks = headWithoutScripts?.replace(/<link[\s\S]*?>/g, '')
    expect(headWithoutLinks.split('\n').filter(Boolean).join('\n').trim()).toMatchInlineSnapshot(`
      "<meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Home x SEO Experiments</title>
      <meta property="og:image" content="https://nuxtseo.com/og-image.png">
      <meta property="og:image:alt" content="hello world">
      <meta property="og:image:type" content="image/png">
      <meta property="og:image:width" content="1270">
      <meta property="og:image:height" content="630">
      <meta name="twitter:image" content="https://nuxtseo.com/og-image.png">
      <meta name="twitter:image:alt" content="hello world">
      <meta name="twitter:image:type" content="image/png">
      <meta name="twitter:image:width" content="1270">
      <meta name="twitter:image:height" content="630">
      <meta name="description" content="Hi, welcome to the production v1.3.4 of SEO Experiments.">
      <meta property="og:type" content="website">
      <meta property="og:description" content="Hi, welcome to the production v1.3.4 of SEO Experiments.">
      <meta name="twitter:card" content="summary_large_image">
      <meta property="og:title" content="Home x SEO Experiments">"
    `)
  })
})
