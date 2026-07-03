import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path().transform(path => path.replace(/^blog\//, '')), // Strips the "blog/" prefix from path
          date: s.isodate(),
          excerpt: s.string(),
          tags: s.array(s.string()).default([]),
          draft: s.boolean().default(false),
          content: s.mdx() // compiled mdx
        })
        .transform(data => ({
          ...data,
          permalink: `/blog/${data.slug}`
        }))
    }
  }
})
