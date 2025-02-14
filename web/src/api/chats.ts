import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from '@/utils/axios'
import { getSessionId } from '@/utils/tokens'
import { Chat } from '@/features/chats/data/schema'
import { ApiResponse } from './response'

const CHAT_ENDPOINT = '/chats'

export const chatsKeys = {
  all: ['chats'] as const,
}

export const useChats = (itemId: number) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: chatsKeys.all,
    queryFn: async () => {
      const sessionId = getSessionId()
      const { data } = await api.get<ApiResponse<Chat[]>>(
        `${CHAT_ENDPOINT}/${sessionId}/${itemId}`
      )
      return data
    },
    placeholderData: keepPreviousData,
  })
}

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      const { data } = await api.post<
        ApiResponse<{ imageUrl: string; fileName: string }>
      >(`${CHAT_ENDPOINT}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    },
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      sessionId,
      itemId,
      message,
      file,
    }: {
      sessionId: string
      itemId: number
      message: string
      file?: { imageUrl: string; fileName: string }
    }) => {
      let filePayload
      if (file) {
        filePayload = {
          fileUrl: file.imageUrl,
          fileName: file.fileName,
        }
      }

      const { data } = await api.post<ApiResponse<Chat>>(`${CHAT_ENDPOINT}`, {
        sessionId,
        itemId,
        message,
        ...(filePayload && { file: filePayload }),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatsKeys.all })
    },
  })
}
