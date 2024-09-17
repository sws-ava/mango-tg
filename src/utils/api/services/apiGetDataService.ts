import ApiRoutes from '@/utils/api/apiRoutes'
import ApiRequestMethod from '@/utils/api/apiRequestMethod'
import { createServices } from '@/utils/api/apiService'

const apiMap: any = {
  blocks: {
    method: ApiRequestMethod.GET,
    route: ApiRoutes.getData.blocks,
  },
  menu: {
    method: ApiRequestMethod.GET,
    route: ApiRoutes.getData.menu,
  },
  orderCreate: {
    method: ApiRequestMethod.POST,
    route: ApiRoutes.getData.orderCreate
  }
}

const apiMapServices = createServices(apiMap)

export default apiMapServices;
