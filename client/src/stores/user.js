import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    email: '',
    coin:0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setCoin(ammount) {
      this.coin=ammount
    },
    logout(){
      localStorage.clear();
    }
  }
})
