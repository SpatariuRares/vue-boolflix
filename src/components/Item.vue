<template>
<li>
	<div class="box-movie">
		<div class="image">
				<div class="poster" v-if="item.poster_path">
						<img :src="`https://image.tmdb.org/t/p/w342${item.poster_path}`"  alt="">
				</div>
				<div class="poster not_film" v-else>
				</div>
		</div>
		<div class=" info">
			<country-flag :country='getFlag(item.original_language)' size='small'/>
			<p>
				<span>
					Titolo: 	
				</span>
				{{item.original_title}}
			</p>
			<p>
				<span>
					voto: 
				</span>
				<font-awesome-icon icon="star" v-for="(n,index) in 5" :class="getActive(item.vote_average,n)" :key="index"/>
			</p>
			<p>
				<span>
					overview: 
				</span>
				{{item.overview}}
			</p>
			<span>
				cast: 
			</span>
			<p v-for="(actor,index) in cast" :key="index">
				{{actor.character}}: {{actor.name}}
			</p>
			<p >
				<span v-for="(genre,index) in genersName" :key="index">
					{{genre.name}}
				</span>
			</p>
		</div>
	</div>
</li>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import axios from 'axios'
export default {
    name: "Item",
	props:["item","genres"],
    components: {
        CountryFlag,
    },
	data(){
		return {
			APIUrl:"https://api.themoviedb.org/3/movie/",
			key:"?api_key=d372f19f679767467d9a71f921e1c8f4",
			cast:[],
			genersName:[],
		}
	},
	created(){
		this.getcast();
		this.getgenres();
	},
	watch:{
		genres: function(){
			let array=[];
			for (let i = 0; i < this.item.genre_ids.length; i++) {
				for (let j = 0; j < this.genres.length-1; j++) {
					if(this.item.genre_ids[i]==this.genres[j].id){
						array.push(this.genres[j])
					}
				}
			}
			this.genersName=array
		},
	},
    methods:{
		getcast(){
			let id = this.item.id;
			id+="/credits"
			axios.get(this.APIUrl+id+this.key).then(response => {
				this.cast = response.data.cast;
				this.cast.splice(5)
			})
		},
        getFlag(language){
            if(language=="en")return "gb"
            return language
        },
        getActive(vote,number){
            vote=vote/2;
            vote=Math.floor(vote);
            if(number<=vote) return "yellow";
            return null
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
   li>div{
        width: 100%;
        &>div, .not_film, .poster{
            width: 100%;
            aspect-ratio: 9/16;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
		li>.box-movie{
			position: relative;
			main{
					overflow: scroll;
					
				}
			
			.info{
				padding:10px;
				overflow: scroll;
				-ms-overflow-style: none;  /* Internet Explorer 10+ */
				scrollbar-width: none;
				position: absolute;
				top: 0;
				left: 0;
				background-color: black;
				animation: slit-out-vertical 0.4s linear both;
				color: white;
					p{
						margin: 0;
						font-size:0.8rem;
						span{
							font-weight: 800;
						}
					}
			}
			.info::-webkit-scrollbar {
				width: 0;  /* Remove scrollbar space */
				height:0 ;
				background: transparent;  /* Optional: just make scrollbar invisible */
			}
			.image{
				animation: slit-in-vertical 0.4s linear both;
				animation-delay:0.4s;
			}
		}
		li>.box-movie:hover{
			.image{
				animation: slit-out-vertical 0.4s linear both;
			}
			.info{
				animation: slit-in-vertical 0.4s linear both;
				Animation-delay:0.4s;
			}
		}
		
    .not_film{
        background-color: black;
    }
    .yellow{
        color: yellow;
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
