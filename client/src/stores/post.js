import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts:[],
    postDetail:{},
    isFavourite:false
  }),
  getters: {

  },
  actions: {
    setPost(id) {
      this.postDetail=this.posts[id];
    }
  }
})
