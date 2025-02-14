import { z } from 'zod'

export const itemSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().positive().multipleOf(0.01),
  image_url: z.string().max(1000).nullable(),
  category: z.string().max(100).nullable(),
  condition: z.string().max(100).nullable(),
  min_acceptable_price: z.number().positive().multipleOf(0.01),
  is_out_of_stock: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date(),
})

export const itemsSchema = z.array(itemSchema)

export type Item = z.infer<typeof itemSchema>
export type Items = z.infer<typeof itemsSchema>
