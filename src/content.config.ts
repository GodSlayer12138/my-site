import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

// Define blog collection
const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      // Special fields
      comment: z.boolean().default(true)
    })
})

// Define photos collection
const photos = defineCollection({
  loader: glob({ base: './src/content/photos', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      publishDate: z.coerce.date(),
      // Main photo - high resolution original
      photo: z.object({
        src: image(),
        alt: z.string(),
        inferSize: z.boolean().optional(),
        width: z.number().optional(),
        height: z.number().optional()
      }),
      // Optional
      description: z.string().max(200).optional(),
      location: z.string().optional(),
      camera: z.string().optional(),
      lens: z.string().optional(),
      settings: z.string().optional(),
      // Thumbnail for list page
      thumbnail: z
        .object({
          src: image(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      draft: z.boolean().default(false),
      comment: z.boolean().default(true)
    })
})

export const collections = { blog, photos }
