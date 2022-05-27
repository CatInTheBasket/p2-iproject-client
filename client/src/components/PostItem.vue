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
        v-model="models"
        v-on:input="updateValue($event.target.value)"
      />
      <textarea
        v-else
        class="form-control"
        :id="models"
        v-model="models"
        v-on:input="updateValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script>


export default {
  mounted() {
    console.log("This is the modelValue "+this.models)
    if (this.models == "typeId") {
      this.inputType = "select";
    } else if (this.models == "roomCapacity" || this.models == "price"){
      this.inputType = "number";
    }
  },
  created(){
    
  },
  props: ["modelValue"],
  data() {
    return {
      models:this.modelValue,
      inputType: "text"
    };
  },
  watch: {
      modelValue: function(value){
      this.$emit('modelValue',value);
    }
  }
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
