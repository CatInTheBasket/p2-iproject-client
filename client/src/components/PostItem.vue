<template>
  <div>
    <div class="mb-3">
      <label :for="models" class="form-label">{{models}}</label>
      <!-- <select v-if="modelValue=='typeId'" required :id="modelValue">
        <option>Select here</option>
        <option v-for="item in types" :key="item.id" :value="item.id" :label="item.name"></option>
      </select> -->
      <input
        v-if="models!='description'"
        :type="inputType"
        class="form-control"
        :id="models"
        v-model="post[modelValue]"
      />
      <textarea
        v-else
        class="form-control"
        :id="models"
        v-model="post[modelValue]"
      />
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { usePostStore } from '../stores/post'

export default {
  mounted() {
    console.log("This is the modelValue "+this.models)
    if (this.models == "typeId") {
      this.inputType = "select";
    } else if (this.models == "roomCapacity" || this.models == "price"){
      this.inputType = "number";
    }
  },
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    ...mapWritableState(usePostStore, ['post']),
    // same as above but registers it as this.myOwnName
    ...mapWritableState(usePostStore, {
      myOwnName: 'post',
    }),
  },
  created(){
    this.post[this.modelValue]=this.attributes;
  },
  props: ["modelValue","attributes"],
  data() {
    return {
      models:this.modelValue,
      inputType: "text",
      attributes:this.attributes
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
