export const normalizeBasename = (value) => {
  if (typeof value !== 'string') return ''

  let result = value.trim()
  if (!result) return ''

  // Remove trailing slashes but keep leading slash semantics intact.
  while (result.length > 1 && result.endsWith('/')) {
    result = result.slice(0, -1)
  }

  // Treat root as "no basename" for React Router.
  if (result === '/') return ''

  return result
}

export const getRouterBasename = () => {
  const pathname = window.location.pathname || '/'

  // Special-case: allow hosting under /rebrick via reverse proxy (YARP, etc.).
  if (pathname === '/rebrick' || pathname.startsWith('/rebrick/')) return '/rebrick'

  return normalizeBasename(import.meta.env.BASE_URL ?? pathname)
}
