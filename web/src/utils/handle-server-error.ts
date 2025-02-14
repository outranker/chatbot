import { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import logger from './logger'

export function handleServerError(error: unknown) {
  logger.error('[handleServerError]', error)

  const errMsg = '오류가 발생했습니다'
  try {
    const toastData = formatServerError(error)
    toast({
      variant: 'destructive',
      title: toastData?.title || errMsg,
      description: toastData?.description || '',
    })
  } catch (error) {
    toast({
      variant: 'destructive',
      title: (error as Error).name,
      description: (error as Error).message,
    })
  }
}

export function formatServerError(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    const err = data?.error
    if (Array.isArray(err?.errors) && err?.errors.length > 0) {
      if (typeof err.errors[0].message === 'string') {
        return {
          title: err.errors[0]?.code || '오류가 발생했습니다',
          description: err.errors[0]?.message || '',
        }
      }
      if ('property' in err.errors[0].message) {
        return {
          title: `Validation Error`,
          description: Object.values(err.errors[0].message.constraints).join(
            ',\n'
          ),
        }
      }
      return {
        title: `${err.errors[0].code} ${err.errors[0].message.error}`,
        description: err.errors[0].message.message,
      }
    }
    return {
      title: error.code,
      description: error.message,
    }
  }
  return {
    title: (error as unknown as Error)?.name || '오류가 발생했습니다',
    description: (error as unknown as Error)?.message || '',
  }
}
