import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts:[],
    post:{
      name:"",
        description:"",
        imgUrl:"",
        location:"",
        tag:"",
        typeId:"",
        statusArchieve:"",
        coin:"",
        id:""
    },
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
