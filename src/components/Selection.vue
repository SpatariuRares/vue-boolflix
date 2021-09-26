<template>
  <select class="px-2" name="" id="" v-model="option" @change="getoption">
    <option value="all">all</option>
    <option v-for="(option,index) in genersName" :key="index" :value="option.id" >{{option.name}}</option>
  </select>
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

</style>
