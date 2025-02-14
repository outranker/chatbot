import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconMessage,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ItemType, Sort, useItems } from '@/api/items'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/main'
import { LoadingSpinner } from '@/components/loader'
import { ThemeSwitch } from '@/components/theme-switch'

const itemTypeText = new Map<string, string>([
  ['all', 'All Items'],
  ['in_stock', 'In Stock'],
  ['out_of_stock', 'Out of Stock'],
])

export default function Items() {
  const [sort, setSort] = useState<Sort>('asc')
  const [itemType, setItemType] = useState<ItemType>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useItems({
      sort,
      itemType,
      searchTerm,
    })

  const { ref, inView } = useInView({
    threshold: 1,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  const flattenedData =
    data?.pages.flatMap((page) => page).filter(Boolean) ?? []

  return (
    <>
      <Main fixed className='max-w-6xl self-center mx-4'>
        <div className='mb-4 mt-2 flex items-end justify-between sm:my-0 sm:items-center'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Antique Items Store
            </h1>
            <p className='text-muted-foreground'>
              List of antique items for sale
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
              <Input
                placeholder='Filter apps...'
                className='h-9 w-40 lg:w-[250px]'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                value={itemType}
                onValueChange={(value) => setItemType(value as ItemType)}
              >
                <SelectTrigger className='w-36'>
                  <SelectValue>{itemTypeText.get(itemType)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Items</SelectItem>
                  <SelectItem value='in_stock'>In Stock</SelectItem>
                  <SelectItem value='out_of_stock'>Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select
              value={sort}
              onValueChange={(value) => setSort(value as Sort)}
            >
              <SelectTrigger className='w-16'>
                <SelectValue>
                  <IconAdjustmentsHorizontal size={18} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent align='end'>
                <SelectItem value='desc'>
                  <div className='flex items-center gap-4'>
                    <IconSortAscendingLetters size={16} />
                    <span>Descending</span>
                  </div>
                </SelectItem>
                <SelectItem value='asc'>
                  <div className='flex items-center gap-4'>
                    <IconSortDescendingLetters size={16} />
                    <span>Ascending</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <ThemeSwitch />
          </div>
        </div>
        <Separator className='shadow' />
        {isLoading ? (
          <div className='flex justify-center'>
            <LoadingSpinner />
          </div>
        ) : flattenedData.length === 0 ? (
          <div className='flex justify-center p-4'>
            <p className='text-muted-foreground'>No data found</p>
          </div>
        ) : (
          <>
            <ul className='no-scrollbar grid gap-6 overflow-auto pb-8 pt-4 md:grid-cols-2 lg:grid-cols-3'>
              {flattenedData.map((history, idx) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.01 }}
                  key={`${history.id}-${idx}`}
                  ref={idx === flattenedData.length - 1 ? ref : undefined}
                  className='group relative rounded-xl border bg-card transition-all duration-300 hover:shadow-lg'
                >
                  <div className='relative aspect-square overflow-hidden rounded-t-xl'>
                    <img
                      src={history.image_url ?? ''}
                      alt={history.name}
                      className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>

                  <div className='p-5'>
                    <div className='mb-4 flex items-center justify-between'>
                      <h2 className='line-clamp-1 text-lg font-semibold tracking-tight'>
                        {history.name}
                      </h2>
                      <Button
                        variant='ghost'
                        size='sm'
                        className={`${
                          history.is_out_of_stock
                            ? 'text-blue-500 dark:text-blue-400'
                            : 'text-green-500 dark:text-green-400'
                        } font-medium`}
                      >
                        {history.is_out_of_stock ? 'Out of Stock' : 'In Stock'}
                      </Button>
                    </div>

                    <p className='mb-4 line-clamp-2 text-sm text-muted-foreground'>
                      {history.description}
                    </p>

                    <div className='flex items-center justify-between'>
                      <div className='text-lg font-bold'>${history.price}</div>
                      <Button
                        onClick={() =>
                          navigate({
                            to: `/chats/$item_id`,
                            params: { item_id: history.id.toString() },
                          })
                        }
                        size='sm'
                        className='gap-2 transition-transform duration-300 hover:scale-105'
                      >
                        <IconMessage size={16} />
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
            {isFetchingNextPage && (
              <div className='flex justify-center'>
                <LoadingSpinner />
              </div>
            )}
          </>
        )}
      </Main>
    </>
  )
}
