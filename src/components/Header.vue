<template>
  <div class="row justify-content-between py-4 px-2">
    <div class="col-4">
      <h1 @click="home">BOOLFLIX</h1>
    </div>
    <div class="row col-4">
      <Selection
        :options="genres"
        @filtergerne="filtergerne"
        class="col-6"
      />
      <Search 
      @search="getsearch"
      class="col-6"
      />
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'
import Selection from './Selection.vue'
export default {
  name: 'Header',
  components:{
    Search,
    Selection,
  },
  props:["genres"],
  data(){
    return {
      gerne:"all",
      genersName:[]
    }
  },
  methods:{
    home(){
      this.$emit('search',"a")
      this.$emit('filtergerne',"all");
    },
    getsearch(info){
      this.$emit('search',info)
    },
    filtergerne(info){
      this.$emit('filtergerne',info);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
  background-color: #000;
}
h1{
  color: #f00;
  cursor: pointer;
  display: inline-block;
  font-weight: 900;
}
</style>
