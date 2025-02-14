import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { api } from '@/utils/axios'
import { Item, Items } from '@/features/items/data/schema'
import { ApiResponse } from './response'

const ITEMS_ENDPOINT = '/items'

export type ItemType = 'all' | 'in_stock' | 'out_of_stock'
export type Sort = 'asc' | 'desc'
export type Page = number
export type Size = number
type UseItemsParams = {
  itemType: ItemType
  searchTerm: string
  sort: Sort
  page: Page
  size: Size
}

export const itemsKeys = {
  all: ({ itemType, searchTerm, sort, page, size }: UseItemsParams) =>
    ['items', itemType, searchTerm, sort, page, size] as const,
  item: (itemId: number) => ['items', itemId] as const,
}

export const useItems = ({
  itemType = 'all',
  searchTerm = '',
  sort = 'desc',
  page = 1,
  size = 10,
}: Partial<UseItemsParams> = {}) => {
  return useInfiniteQuery({
    queryKey: itemsKeys.all({ itemType, searchTerm, sort, page, size }),
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<ApiResponse<Items>>(
        `${ITEMS_ENDPOINT}?page=${pageParam}&size=${size}&type=${itemType}&search=${searchTerm}&sort=${sort}`
      )
      return data
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === size ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const useItem = (itemId: number) => {
  return useQuery({
    queryKey: itemsKeys.item(itemId),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Item>>(
        `${ITEMS_ENDPOINT}/${itemId}`
      )
      return data
    },
  })
}
