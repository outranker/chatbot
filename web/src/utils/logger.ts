/* eslint-disable no-console */

const info = (...args: unknown[]) => {
  console.log(...args)
}
const log = (...args: unknown[]) => {
  console.log(...args)
}

const error = (...args: unknown[]) => {
  console.error(...args)
}

const logger = {
  info,
  error,
  log,
}

export default logger
