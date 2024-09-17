import { defineStore } from 'pinia';

export const useNotifications = defineStore('notifications', {
  state: () => ({
    list: [],
    delay: 3000
  }),
  actions: {
    success(title: string, desc: string, delay: number = this.delay) {
      this.setItem('success', title, desc, delay);
    },
    warn(title: string, desc: string, delay: number = this.delay) {
      this.setItem('warn', title, desc, delay);
    },
    info(title: string, desc: string, delay: number = this.delay) {
      this.setItem('info', title, desc, delay);
    },
    error(title: string, desc: string, delay: number = this.delay) {
      this.setItem('error', title, desc, delay);
    },
    setItem(type, title, desc, delay) {
      const item= {
        type: type,
        title,
        desc
      };
      this.list.push(item);

      setTimeout(()=>{
        this.removeItem(item);
      }, delay)
    },
    removeItem(item) {
      const itemIndex = this.list.indexOf(item);

      this.list.splice(itemIndex, 1);
    }
  }
})
