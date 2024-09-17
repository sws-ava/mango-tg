import {defineComponent} from 'vue';
import { useNotifications } from "@/store/notifications";
import Icon from "@/components/Share/Icon/Icon.vue";

export default defineComponent({
  name: 'Notifications',
  setup() {
    const store = useNotifications();

    return {
      store
    }
  },
  data() {
    return {
      list: this.store.list,
      icons: {
        info: 'check-circle',
        success: 'check-circle',
        warn: 'warning',
        error: 'x-circle'
      }
    }
  },
  components: {
    Icon
  }
});