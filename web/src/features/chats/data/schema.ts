import { z } from 'zod'
import { Item, itemSchema } from '@/features/items/data/schema'

const sessionSchema = z.object({
  id: z.number(),
  session_id: z.string().max(255),
  created_at: z.date(),
  updated_at: z.date(),
})

export const messageSchema = z.object({
  id: z.number(),
  session_id: z.string().max(255),
  item_id: z.number().nullable(),
  role: z.string().max(50),
  content: z.string(),
  image_url: z.string().max(1000),
  created_at: z.date(),
  item: itemSchema,
  session: sessionSchema,
})

export const messagesSchema = z.array(messageSchema)

export type Session = z.infer<typeof sessionSchema>
export type Message = z.infer<typeof messageSchema>
export type Messages = z.infer<typeof messagesSchema>

export type Chat = {
  id: number
  item: Item
  messages: Message[]
  session: Session
}
