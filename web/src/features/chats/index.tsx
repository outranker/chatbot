import { useState, useRef } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { format } from 'date-fns'
import { IconLoader, IconPhotoPlus, IconSend, IconX } from '@tabler/icons-react'
import { Route as ItemIdRoute } from '@/routes/_app/chats/$item_id'
import { motion, AnimatePresence } from 'framer-motion'
import { useChats, useSendMessage, useUploadFile } from '@/api/chats'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { LoadingSpinner } from '@/components/loader'
import { Message } from '@/features/chats/data/schema'

const MessageContent = ({ msg }: { msg: Message }) => {
  if (msg.image_url) {
    return (
      <div className='flex flex-col gap-2'>
        <img
          src={msg.image_url}
          alt={msg.content}
          className='max-w-[240px] rounded-lg'
        />
        <span>{msg.content}</span>
      </div>
    )
  }
  return <>{msg.content}</>
}

export default function Chats() {
  const { item_id } = ItemIdRoute.useParams()
  const { data: chatData, isLoading } = useChats(Number(item_id))
  const { mutateAsync: sendMessageMutation, isPending } = useSendMessage()
  const { mutateAsync: uploadFileMutation, isPending: isUploading } =
    useUploadFile()
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const chat = chatData?.find((chat) => chat.item.id === Number(item_id))

  const currentMessage =
    chat?.messages.reduce((acc: Record<string, Message[]>, msg) => {
      const key = format(new Date(msg.created_at), 'd MMM, yyyy')
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(msg)
      return acc
    }, {}) ?? {}

  const sendMessage = async () => {
    if (chat && message) {
      if (selectedFile) {
        const { imageUrl, fileName } = await uploadFileMutation(selectedFile)
        await sendMessageMutation({
          sessionId: chat.session.session_id,
          itemId: chat.item.id,
          message,
          file: { imageUrl, fileName },
        })
        setSelectedFile(null)
        setMessage('')
      } else {
        await sendMessageMutation({
          sessionId: chat.session.session_id,
          itemId: chat.item.id,
          message,
        })
        setMessage('')
      }
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type and size
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
      ]
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload an image (JPG, PNG, GIF) or PDF file')
        return
      }

      if (file.size > maxSize) {
        alert('File size must be less than 5MB')
        return
      }

      setSelectedFile(file)
    }
    // Reset the input value to allow selecting the same file again
    if (event.target.value) {
      event.target.value = ''
    }
  }

  if (isLoading) {
    return (
      <Main fixed>
        <div className='flex h-full items-center justify-center'>
          <LoadingSpinner />
        </div>
      </Main>
    )
  }

  if (!chat) {
    return (
      <Main fixed>
        <div className='flex h-full items-center justify-center'>
          <p>No chat found</p>
        </div>
      </Main>
    )
  }

  return (
    <Main fixed>
      <section className='flex h-full flex-col gap-6 max-w-6xl self-center'>
        {/* Product Info Section */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='rounded-lg border bg-card p-4 shadow-sm'
          >
            <div className='flex gap-4'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='relative h-24 w-24 overflow-hidden rounded-lg'
              >
                <img
                  src={chat.item.image_url ?? ''}
                  alt={chat.item.name}
                  className='h-full w-full object-cover'
                />
              </motion.div>
              <div className='flex-1'>
                <div className='flex items-start justify-between'>
                  <h2 className='text-lg font-semibold'>{chat.item.name}</h2>
                  <Badge
                    variant={
                      chat.item.is_out_of_stock ? 'destructive' : 'secondary'
                    }
                    className='transition-all duration-300 hover:scale-105'
                  >
                    {chat.item.is_out_of_stock ? 'Out of Stock' : 'In Stock'}
                  </Badge>
                </div>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {chat.item.description}
                </p>
                <div className='mt-2 font-semibold'>${chat.item.price}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Chat Container */}
        <div className='flex flex-1 flex-col gap-2 rounded-md'>
          <div className='flex size-full flex-1'>
            <div className='chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='chat-flex flex h-40 w-full flex-grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pb-4 pr-4'
              >
                {currentMessage &&
                  Object.keys(currentMessage).map((key) => (
                    <Fragment key={key}>
                      {currentMessage[key].map((msg, index) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            type: 'spring',
                            duration: 0.5,
                            delay: index * 0.1,
                          }}
                          key={`${msg.role}-${msg.created_at}-${index}`}
                          className={cn(
                            'chat-box max-w-[80%] break-words px-3 py-2 shadow-lg transition-all duration-300 hover:shadow-md',
                            msg.role === 'user'
                              ? 'self-end rounded-[16px_16px_0_16px] bg-primary/85 text-primary-foreground'
                              : 'self-start rounded-[16px_16px_16px_0] bg-secondary'
                          )}
                        >
                          <MessageContent msg={msg} />
                          <span
                            className={cn(
                              'mt-1 block text-xs font-light italic text-muted-foreground',
                              msg.role === 'user' &&
                                'text-right text-primary-foreground/75'
                            )}
                          >
                            {format(new Date(msg.created_at), 'h:mm a')}
                          </span>
                        </motion.div>
                      ))}
                      <div className='text-center text-xs'>{key}</div>
                    </Fragment>
                  ))}
              </motion.div>
            </div>
          </div>

          {/* File Preview */}
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mx-2 flex items-center gap-2 rounded-md border bg-muted p-2'
            >
              {selectedFile.type.startsWith('image/') ? (
                <div className='h-12 w-12 overflow-hidden rounded'>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt='Preview'
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : (
                <div className='flex h-12 w-12 items-center justify-center rounded bg-secondary'>
                  <IconPhotoPlus size={20} />
                </div>
              )}
              <div className='flex flex-col'>
                <span className='text-sm font-medium truncate'>
                  {selectedFile.name}
                </span>
                <span className='text-xs text-muted-foreground'>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                </span>
              </div>
              <Button
                variant='ghost'
                size='sm'
                className='ml-auto'
                onClick={() => setSelectedFile(null)}
              >
                <IconX size={16} />
              </Button>
            </motion.div>
          )}

          <form
            className='flex w-full flex-none gap-2'
            onSubmit={async (e) => {
              e.preventDefault()
              await sendMessage()
            }}
          >
            <div className='flex flex-1 items-center gap-2 rounded-md border border-input px-2 py-1 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring lg:gap-4'>
              <div className='space-x-1'>
                <Button
                  size='icon'
                  type='button'
                  variant='ghost'
                  className='h-8 rounded-md lg:inline-flex'
                  disabled={isPending || isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type='file'
                    className='hidden'
                    onChange={handleFileSelect}
                    accept='.jpg,.jpeg,.png,.gif,.pdf'
                  />
                  {isPending || isUploading ? (
                    <IconLoader className='animate-spin' size={20} />
                  ) : (
                    <IconPhotoPlus
                      size={20}
                      className='stroke-muted-foreground'
                    />
                  )}
                </Button>
              </div>
              <label className='flex-1'>
                <span className='sr-only'>Chat Text Box</span>
                <input
                  type='text'
                  placeholder={
                    selectedFile
                      ? 'Add a message (optional)...'
                      : 'Type your messages...'
                  }
                  className='h-8 w-full bg-inherit focus-visible:outline-none'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isPending || isUploading}
                />
              </label>
              <Button
                variant='ghost'
                size='icon'
                className='hidden sm:inline-flex'
                disabled={
                  isPending || isUploading || (!message && !selectedFile)
                }
                type='submit'
              >
                {isPending ? (
                  <IconLoader className='animate-spin' size={20} />
                ) : (
                  <IconSend size={20} />
                )}
              </Button>
            </div>
            <Button
              className='h-full sm:hidden'
              type='submit'
              disabled={isPending || isUploading || (!message && !selectedFile)}
            >
              {isPending ? (
                <IconLoader className='animate-spin mr-2' size={18} />
              ) : (
                <IconSend size={18} className='mr-2' />
              )}
              {selectedFile ? 'Upload' : 'Send'}
            </Button>
          </form>
        </div>
      </section>
    </Main>
  )
}
