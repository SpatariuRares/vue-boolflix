<template>
  <div class="row justify-content-between py-4 px-2">
    <h1 class="col-4">BOOLFLIX</h1>
      <Selection
        :options="genres"
        @filtergerne="filtergerne"
        class="col-2"
      />
      <Search 
      @search="getsearch"
      class="col-4"
      />
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
    getsearch(info){
      this.$emit('search',info)
    },
    filtergerne(info){
      console.log("header")
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
  font-weight: 900;
}
</style>
