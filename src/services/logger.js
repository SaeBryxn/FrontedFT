export function log(...args) {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}

export function error(...args) {
  if (import.meta.env.DEV) {
    console.error(...args)
  }
}
