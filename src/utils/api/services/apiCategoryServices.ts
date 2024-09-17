import ApiRoutes from '@/utils/api/apiRoutes'
import ApiRequestMethod from '@/utils/api/apiRequestMethod'
import { createServices } from '@/utils/api/apiService'

const apiMap: any = {
  getList: {
    method: ApiRequestMethod.GET,
    route: ApiRoutes.categories.list,
  },
  getItem: {
    method: ApiRequestMethod.GET,
    route: ApiRoutes.categories.item,
  },
  createItem: {
    method: ApiRequestMethod.POST,
    route: ApiRoutes.categories.list,
  },
  updateItem: {
    method: ApiRequestMethod.PUT,
    route: ApiRoutes.categories.item,
  },
  showHide: {
    method: ApiRequestMethod.GET,
    route: ApiRoutes.categories.showHide,
  },
  removeItem: {
    method: ApiRequestMethod.DELETE,
    route: ApiRoutes.categories.item,
  },
  orderItem: {
    method: ApiRequestMethod.GET,
    route: ApiRoutes.categories.orderItem,
  },
  syncProducts: {
    method: ApiRequestMethod.POST,
    route: ApiRoutes.categories.syncProducts,
  },
  attachProducts: {
    method: ApiRequestMethod.POST,
    route: ApiRoutes.categories.attachProducts,
  },
}

const apiMapServices = createServices(apiMap)

export default apiMapServices;
