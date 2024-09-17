import axios, { AxiosInstance } from 'axios'
import router from '@/router'
import { useUserSession } from '@/store/userSession'

export default abstract class ApiGateway {
  public static instance: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

  /**
   *  Interceptors для каждого request/response
   *
   * @static
   */
  public static setInterceptor() {
    ApiGateway.instance.interceptors.request.use(
      (config: any) => {
        const token: string | null = localStorage.getItem('tokenPinCode')
          ? localStorage.getItem('tokenPinCode')
          : localStorage.getItem('token')

        if (token) {
          // config.headers['Authorization'] = `Bearer 80|DdKeiQ1ZOjiWYM4Oa5fMLphaFo8ZoPnz2TkfzerN`;
          config.headers['Authorization'] = `Bearer ${token}`
          config.headers['Content-Type'] = config.isFileUpload ? 'multipart/form-data' : 'application/json'
          config.headers['Access-Control-Allow-Origin'] = ''
          config.headers['Access-Control-Allow-Methods'] = ''
          config.headers['Access-Control-Allow-Headers'] = '*'
        }
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )

    return ApiGateway.instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error.response.status === 401) {
          const userSession = useUserSession()

          userSession.logoutUser()
        }
        return error.response
      })
  }

  public static createServices(mapServices: any) {
    this.setInterceptor()

    const services: any = {}

    if (mapServices) {
      for (const [key, value] of Object.entries(mapServices)) {
        services[key] = this.createPromise(value)
      }
    }

    return services
  }

  private static createPromise(service: any) {

    return async (properties: any, body: any, headers: any) => {
      try {
        const response = await ApiGateway.instance[service.method](ApiGateway.replaceRouteProperties(service.route, properties), body, headers)
        if (!response.data) Object.assign(response, { data: {} })
        Object.assign(response.data, { status: response.status })
        return response.data
      } catch (e) {
        return e
      }
    }

  }

  private static replaceRouteProperty(route: string, key: any, value: any) {
    return route.replace(`{${key}}`, String(value))
  }

  private static replaceRouteProperties(route: string, properties: any) {
    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (value) {
          route = this.replaceRouteProperty(route, key, value)
        }
      }
    }

    return route
  }

  private static normalizeRoute(route: string, properties: any, query: string): string {
    return route + properties
  }
}
