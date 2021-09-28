<template>
<div>
	<div  class=" position-relative rating" >
		<div class="empty position-absolute">
			<font-awesome-icon icon="star" v-for="(n,index) in 5" :key="index"/>
		</div>
		<div class="full" ref="ciao">
			<font-awesome-icon icon="star" v-for="(n,index) in 5" :key="index"/>
		</div>
	</div>
</div>
</template>

<script>
export default {
    name: "Item",
	props:["item"],
	watch:{
		item: function(){
			this.getStar();
		}
	},
	mounted(){
		this.getStar();
	},
	methods:{
		getStar(){
			let star=this.$refs.ciao
			let vote = Math.floor(this.item.vote_average)*10;
			star.style.width=vote+"%";
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.full{
	z-index: 9;
	position: relative;
	color: rgb(255, 0, 0);
	white-space: nowrap;
	overflow:hidden;
}
.rating{
	display: inline-block;
}
</style>
