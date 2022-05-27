import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    chat:[],
    chatDetail:{},
    postId:-1
  }),
  getters: {
    
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
