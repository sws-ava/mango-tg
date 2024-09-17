import axios, { AxiosInstance, AxiosInterceptorManager } from 'axios'
import { useUserSession } from '@/store/userSession'


/**
 * Create axios client
 */
const axiosInstance: any | AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })


/**
 * Set interceptor for axios
 *
 * @function
 * @return AxiosInterceptorManager<any>
 */
const setInterceptors = (): AxiosInterceptorManager<any> => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const token: string | null = localStorage.getItem('tokenPinCode')
        ? localStorage.getItem('tokenPinCode')
        : localStorage.getItem('token')

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        config.headers['Content-Type'] = config.isFileUpload ? 'multipart/form-data' : 'application/json'
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance.interceptors.response.use(
    (response: any) => {
      return response
    },
    (error: any) => {
      if (error.response.status === 401) {
        const userSession = useUserSession()

        userSession.logoutUser()
        return
      }
      return { data: error.response, status: error.response.status }
    })
}

/**
 * Create route using props & route
 *
 * @function
 * @param route
 * @param properties
 */
const getUrlFromRouteProps = (route: string, properties: any): string => {
  if (properties) {
    for (const [key, value] of Object.entries(properties)) {
      if (value) {
        route = route.replace(`{${key}}`, String(value))
      }
    }
  }

  return import.meta.env.VITE_API_BASE_URL + route
}

/**
 * Create request
 *
 * @param service
 * @return object
 */
const createRequest = (service: any | object): object => {
  return async (properties: any, body: any, headers: any): Promise<any> => {
    const response: any = await axiosInstance[service.method](getUrlFromRouteProps(service.route, properties), body, headers)
    return {
      data: response.data,
      status: response.status,
      meta: response.data?.meta || null,
      links: response.data?.links || null,
    }
  }
}

/**
 * Create API service
 *
 * @function
 * @param mapServices
 * @return  any | object
 */
export const createServices = (mapServices: object): any | object => {
  setInterceptors()

  const services: any | object = {}

  if (mapServices) {
    for (const [key, value] of Object.entries(mapServices)) {
      services[key] = createRequest(value)
    }
  }

  return services
}
