import { createFileRoute } from '@tanstack/react-router'
import Items from '@/features/items'

export const Route = createFileRoute('/_app/')({
  component: Items,
})

export function RouteComponent() {
  return <Items />
}
