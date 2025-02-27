import { createFileRoute } from '@tanstack/react-router'
import Chats from '@/features/chats'

export const Route = createFileRoute('/_app/chats/$item_id/')({
  component: Chats,
})
