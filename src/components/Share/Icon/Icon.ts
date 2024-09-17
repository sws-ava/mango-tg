import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },
})