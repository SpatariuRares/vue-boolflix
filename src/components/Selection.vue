<template>
<div>
  <select class="form-control" name="" id="" data-live-search="true"  v-model="option" @change="getoption">
    <option value="all">all</option>
    <option v-for="(option,index) in genersName" :key="index" :value="option.id" >{{option.name}}</option>
  </select>
</div>
</template>

<script>
export default {
  name: 'Selection',
  props:["options"],
  data(){
    return {
      option:"all",
      genersName:[]
    }
  },
  watch:{
		options: function(){
			this.genersName=this.options
		}
	},
  methods:{
    getoption(){
      this.$emit('filtergerne',this.option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  select {
    border-radius: 0;
    border: 0 ;
    background-color: #222;
    color: #444;
 
    &:focus{
      background-color: #222;
      color: #444;
      outline: 0; 
      box-shadow: 0 0; 
    }
    option{
      background-color: #222;
      color: #444;
      border-radius: 0;
      border: 0;
      &:focus{
        background-color: #444;
        color: #666;
      }
      overflow: scroll;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;
    }
     &::-webkit-scrollbar {
      width: 0;  /* Remove scrollbar space */
      height:0 ;
      background: transparent;  /* Optional: just make scrollbar invisible */
     }
  }

</style>
