<template>
<div class="movie">
	<button class="bottoni left" v-if="maxLeft" @click="scroll_left"><font-awesome-icon icon="chevron-left"/></button>
	<button class="bottoni right" v-if="maxRight" @click="scroll_right"><font-awesome-icon icon="chevron-right"/></button>
	<ul class="row d-flex flex-nowrap wrap-box" :id="id">
		<Item
			v-for="(movie,index) in movies" :key="index" class="col-2"
			:item="movie"
			:genres="genres"
			:filtergerner="filtergerner"
		/>
	</ul>
</div>
</template>

<script>
import axios from 'axios'
import Item from './Item.vue'
export default {
    name: 'Row',
    props:["search","id","genres","filtergerner"],
    components: {
		Item
    },
	data(){
		return {
			APIUrl:"https://api.themoviedb.org/3/search/",
			key:"?api_key=d372f19f679767467d9a71f921e1c8f4",
			querry: "&query=a",
			movies:[],
			maxLeft:false,
			maxRight:true,
		}
	},
	watch:{
		search: function(){
			this.querry="&query="+this.search;
			if(this.querry=="&query="){
				this.querry="&query=a"
			}
			this.getMovie();
		},
	},
	created(){
		this.querry="&query=a";
		this.getMovie();
	},
    methods:{
		getMovie(){
			axios.get(this.APIUrl+this.id+this.key+this.querry).then(response => {
				this.movies=response.data.results;
			})
		},
		scroll_left() {
			let content = document.querySelector("#"+this.id);
			content.scrollLeft -= 250;
			if(content.scrollLeft==0){
				this.maxLeft= false
			}
			else{
				this.maxLeft= true
			}
			if(content.scrollLeft>=(content.scrollWidth-content.offsetWidth - 2)){
				this.maxRight= false
			}
			else{
				this.maxRight= true
			}
		},
		scroll_right() {
			let content = document.querySelector("#"+this.id);
			content.scrollLeft += 250;
			if(content.scrollLeft==0){
				this.maxLeft= false
			}
			else{
				this.maxLeft= true
			}
			if(content.scrollLeft>=(content.scrollWidth-content.offsetWidth - 2)){
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
	opacity: 0;
	height:100%;
	font-size: 2rem;
	border: 0;
	background-color:rgba(0, 0, 0, 0.31);
	position:absolute;
	margin:5px;
	z-index: 999;
	top: 0;
	margin: 0;
	color:white;
	padding:0 20px;
	transition: opacity 0.5s;
	&.left{
		left: 0;
	}
	&.right{
		right: 0;
	}
	&:hover{
		opacity: 1;
	}
}
.wrap-box{
	overflow: scroll;
	-ms-overflow-style: none;  /* Internet Explorer 10+ */
	scrollbar-width: none;
}
.wrap-box::-webkit-scrollbar {
	width: 0;  /* Remove scrollbar space */
	height:0 ;
	background: transparent;  /* Optional: just make scrollbar invisible */
}
ul{
	padding: 0 20px;
    list-style: none;
    margin: 0;
}

@keyframes slit-out-vertical {
   0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(90deg);
  }
}
@keyframes slit-in-vertical {
    0% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}
</style>
