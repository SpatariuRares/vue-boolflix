<template>
<li>
	<div class="box-movie">
		<div class="image">
				<div class="poster" v-if="movie.poster_path">
						<img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"  alt="">
				</div>
				<div class="poster not_film" v-else>
				</div>
		</div>
		<div class=" info">
			<country-flag :country='getFlag(movie.original_language)' size='small'/>
			<p>
				<span>
					Titolo: 	
				</span>
				{{movie.original_title}}
			</p>
			<p>
				<span>
					voto: 
				</span>
				<font-awesome-icon icon="star" v-for="(n,index) in 5" :class="getActive(movie.vote_average,n)" :key="index"/>
			</p>
			<p>
				<span>
					overview: 
				</span>
				{{movie.overview}}
			</p>
			
		</div>
	</div>
</li>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
    name: 'Movieitem',
	props:["movie"],
    components: {
        CountryFlag,
    },
    methods:{
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
            aspect-ratio: 9/15;
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
