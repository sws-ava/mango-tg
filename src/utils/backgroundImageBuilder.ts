export const backgroundImageBuilder = (image:string) => {
  if(!image) return ''
  if(!import.meta.env.VITE_STORAGE_BASE_URL) return ''

  return (import.meta.env.VITE_STORAGE_BASE_URL + image).toString()
  // return import.meta.env.VITE_STORAGE_BASE_URL + path
}