export const imagePathBuilder = (path:string) => {
  if(!path) return ''
  if(!import.meta.env.VITE_BASE_URL) return ''


  return import.meta.env.VITE_STORAGE_BASE_URL + path
}