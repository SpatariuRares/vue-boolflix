<template>
  <ul class="row d-flex p-0 flex-nowrap">
		<li v-for="(serie,index) in series" :key="index" class="col-2">
			<div class="box-movie">
				<div class="image">
					<div class="poster" v-if="serie.poster_path">
						<img :src="`https://image.tmdb.org/t/p/w342${serie.poster_path}`"  alt="">
					</div>
					<div class="poster not_film" v-else></div>
				</div>
				<div class=" info">
					<country-flag :country='getFlag(serie.origin_country[0])' size='small'/>
						<p>
							<span>
								Titolo: 	
							</span>
								{{serie.name}}
						</p>
						<p>
							<span>
								voto: 
							</span>
							<font-awesome-icon icon="star" v-for="(n,index) in 5" :class="getActive(serie.vote_average,n)" :key="index"/>
						</p>
						<p>
							<span>
								overview: 
							</span>
								{{serie.overview}}
						</p>
				</div>
			</div>
		</li>
  </ul>
</template>



<script>
import CountryFlag from 'vue-country-flag'
export default {
    name: 'Series',
    props:["series"],
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
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul{
    list-style: none;
    margin: 0;
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
			.info{
				padding:10px;
				overflow: scroll;
				-ms-overflow-style: none;  /* Internet Explorer 10+ */
				scrollbar-width: none;
				position: absolute;
				top: 0;
				left: 0;
				background-color: black;
				animation: slit-out-vertical 0.5s linear both;
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
				animation: slit-in-vertical 0.45s linear both;
			}
		}
		li>.box-movie:hover{
			.image{
					animation: slit-out-vertical 0.5s linear both;
			}
			.info{
				animation: slit-in-vertical 0.45s linear both;
			}
		}
		
    .not_film{
        background-color: black;
    }
    .yellow{
        color: yellow;
    } 
}

@keyframes slit-out-vertical {
  0% {
    transform:  rotateY(0);
    opacity: 1;
  }
  100% {
    transform: rotateY(90deg);
    opacity: 0;
  }
}
@keyframes slit-in-vertical {
  0% {
    transform: rotateY(-90deg);
    opacity: 0;
  }
  100% {
    transform:rotateY(0);
		opacity: 1;
  }
}
</style>



