import { v4 as uuidv4 } from 'uuid'

export const setSessionId = (sessionId: string): void => {
  sessionStorage.setItem('SESSION_ID', sessionId)
}

export const getSessionId = (): string => {
  const sessionId = sessionStorage.getItem('SESSION_ID')
  if (!sessionId) {
    const uuid = uuidv4()
    setSessionId(uuid)
    return uuid
  }
  return sessionId
}

export const removeSessionId = (): void => {
  if (getSessionId() != null) sessionStorage.removeItem('SESSION_ID')
}
