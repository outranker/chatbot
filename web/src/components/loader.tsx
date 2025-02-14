import { LoaderCircle, LucideProps, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface IProps extends LucideProps {
  className?: string
}

export const LoadingSpinner = ({ className, ...props }: IProps) => {
  return <LoaderCircle className={cn('animate-spin', className)} {...props} />
}

export const Loader = ({ className }: { className?: string }) => {
  return (
    <Loader2
      className={cn('my-28 h-16 w-16 text-primary/60 animate-spin', className)}
    />
  )
}
