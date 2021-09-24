<template>
  <form class="d-flex">
    <div class="flex-grow-1">
      <input 
        class="form-control"
        type="text" 
        name="search" 
        v-model="ricerca"
        @keyup="$emit('search',ricerca)"
        placeholder="Search">
      </div>
  </form>
</template>

<script>

export default {
  name: 'Search',
  data(){
    return {
      ricerca:''
    }
  },
  methods:{
    reset(){
      this.ricerca="";
      this.$emit=('search',this.ricerca)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

input[type="text"]{
    border-radius: 0;
}
</style>
