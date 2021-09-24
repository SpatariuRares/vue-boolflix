<template>
  <div class="row justify-content-between py-4 px-2">
    <h2 class="col-4">BOOLFLIX</h2>
    <Search 
    @search="getsearch"
    class="col-3"
    />
  </div>
</template>

<script>
import Search from './Search.vue'
export default {
  name: 'Header',
  components:{
    Search,
  },
  methods:{
    getsearch(info){
      console.log(info)
      this.$emit('search',info)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
  background-color: #000;
}
h2{
  color: #f00;
  font-weight: 900;
}
</style>
