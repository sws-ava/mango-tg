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
}

const apiMapServices = createServices(apiMap)

export default apiMapServices;
