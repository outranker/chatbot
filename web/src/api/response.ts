export type Paging = {
  page: number
  size: number
  total_count: number
}

export type SuccessResponse<T> = T

export type ErrorResponse = {
  message: string
}

export type ApiResponse<T> = SuccessResponse<T>
