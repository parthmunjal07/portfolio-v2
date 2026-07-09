import { defineConfig, s } from 'velite'
import fs from 'fs'

const getReadingTime = (content: string) => {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

import rehypeSlug from 'rehype-slug'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  mdx: {
    rehypePlugins: [rehypeSlug]
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
          toc: s.toc(),
          content: s.mdx() // compiled mdx
        })
        .transform((data, { meta }) => {
          const rawContent = fs.readFileSync(meta.path, 'utf8')
          const readingTime = getReadingTime(rawContent)

          return {
            ...data,
            permalink: `/blog/${data.slug}`,
            readingTime
          }
        })
    },
    caseStudies: {
      name: 'CaseStudy',
      pattern: 'casestudies/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path().transform(path => path.replace(/^casestudies\//, '')),
          date: s.isodate(),
          excerpt: s.string(),
          toc: s.toc(),
          content: s.mdx()
        })
        .transform((data, { meta }) => {
          const rawContent = fs.readFileSync(meta.path, 'utf8')
          const readingTime = getReadingTime(rawContent)

          return {
            ...data,
            permalink: `/projects/casestudies/${data.slug}`,
            readingTime
          }
        })
    }
  }
})
