<template>
<div class="movie">
	<button class="bottoni left" v-if="maxLeft" @click="scroll_left"><font-awesome-icon icon="chevron-left"/></button>
	<button class="bottoni right" v-if="maxRight" @click="scroll_right"><font-awesome-icon icon="chevron-right"/></button>
	<ul class="row d-flex p-0 flex-nowrap wrapper-box">
		<Movieitem
			v-for="(movie,index) in movies" :key="index" class="col-2"
			:movie="movie"
		/>
	</ul>
</div>
</template>

<script>
import Movieitem from './movieitem.vue'
export default {
    name: 'Movies',
    props:["movies"],
    components: {
		Movieitem
    },
	data(){
		return {
			maxLeft:false,
			maxRight:true,
		}
	},
    methods:{
		scroll_left() {
			let content = document.querySelector(".wrapper-box");
			content.scrollLeft -= 250;
			if(content.scrollLeft==0){
				this.maxLeft= false
			}
			else{
				this.maxLeft= true
			}
			if(content.scrollLeft==(content.scrollWidth-content.offsetWidth)){
				this.maxRight= false
			}
			else{
				this.maxRight= true
			}
		},
		scroll_right() {
			let content = document.querySelector(".wrapper-box");
			content.scrollLeft += 250;
			if(content.scrollLeft==0){
				this.maxLeft= false
			}
			else{
				this.maxLeft= true
			}
			if(content.scrollLeft==(content.scrollWidth-content.offsetWidth)){
				this.maxRight= false
			}
			else{
				this.maxRight= true
			}
		},
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.movie {
	position: relative;
}
.bottoni{
	height:100%;
	border: 0;
	background-color:rgba(0, 0, 0, 0.31);
	position:absolute;
	margin:5px;
	z-index: 999;
	top: 0;
	width: 50px;
	margin: 0;
	color:white;
	&.left{
		left: 0;
	}
	&.right{
		right: 0;
	}
}
.wrapper-box{
	overflow: scroll;
	-ms-overflow-style: none;  /* Internet Explorer 10+ */
	scrollbar-width: none;
}
.wrapper-box::-webkit-scrollbar {
	width: 0;  /* Remove scrollbar space */
	height:0 ;
	background: transparent;  /* Optional: just make scrollbar invisible */
}
ul{
    list-style: none;
    margin: 0;
}

@keyframes slit-out-vertical {
   0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(90deg);
	opacity: 0;
  }
}
@keyframes slit-in-vertical {
    0% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
	opacity: 1;
  }
}
</style>
