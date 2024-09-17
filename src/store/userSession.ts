import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import router from "@/router"

export type UserData = Record<string, any> | null

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const token = useStorage('token', '')
  const user: any = useStorage('user', null)
  //const user: any = ref('')
  const loading = ref(true)

  const isLoggedIn = computed(() => !!token.value)

  function setUser(newUser: Partial<UserData>) {
    user.value = JSON.stringify(newUser)
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  function logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    token.value = null
    user.value = null

    router.push({ name: 'Main' })
  }

  return {
    user,
    token,
    isLoggedIn,
    loading,
    logoutUser,
    setUser,
    setToken,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot))
}
