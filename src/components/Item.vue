<template>
<div v-if="getShow()">
	<li @click="showdetail()">
		<div class="box-movie">
			<div class="image">
					<div class="poster" v-if="item.poster_path">
							<img :src="`https://image.tmdb.org/t/p/w342${item.poster_path}`"  alt="">
					</div>
					<div class="poster not_film position-relative" v-else>
						<font-awesome-icon class="position-absolute top-50 start-50 translate-middle" icon="eye-slash"/>
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
				<p v-for="(actor,index) in cast" :key="actor.name+index">
					{{actor.character}}: {{actor.name}}
				</p>
				<span>
					gener:
				</span> 
				<span v-for="(genre,index) in genersName" :key="genre.name+index">
					{{genre.name}}
				</span>
			</div>
		</div>
	</li>
	<div v-if="detail" @click="hidedetail()" class=" detail-container">
		<div class="position-absolute top-50 start-50 translate-middle info">
			<img :src="`https://image.tmdb.org/t/p/w342${item.backdrop_path}`"  alt="">
			<div class="text">
				<div class="d-flex justify-content-between">
					<div class="d-flex align-items-center">
						<span>
							Titolo: 	
						</span>
						<h2>
							{{item.original_title}}
						</h2>
					</div>
					<div>
						<span>
							voto: 
						</span>
						<font-awesome-icon icon="star" v-for="(n,index) in 5" :class="getActive(item.vote_average,n)" :key="index"/>
					</div>
				</div>
				<div class="d-flex">
					<span>
						overview: 
					</span>
					<p>
						{{item.overview}}
					</p>
				</div>
				<div class="d-flex flex-wrap">
					<p>
						cast: 
					</p>
					<div class="container">
						<div class="row">
							<div v-for="(actor,index) in cast" :key="actor.name+index" class="d-flex col-4 flex-column align-items-center actor ">
								<img :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${actor.profile_path}`"  alt="">
								<p >
									{{actor.character}}: {{actor.name}}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex">
					<span>
						gener:
					</span> 
					<p class="gener" v-for="(genre,index) in genersName" :key="genre.name+index">
						{{genre.name}}
					</p>

				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import axios from 'axios'
export default {
    name: "Item",
	props:["item","genres","filtergerner"],
    components: {
        CountryFlag,
    },
	data(){
		return {
			APIUrl:"https://api.themoviedb.org/3/movie/",
			key:"?api_key=d372f19f679767467d9a71f921e1c8f4",
			cast:[],
			genersName:[],
			detail:false
		}
	},
	created(){
		this.getcast();
	},
	watch:{
		genres: function(){
			let array=[];
			for (let i = 0; i < this.item.genre_ids.length-1; i++) {
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
		showdetail(){
			this.detail=true;
		},
		hidedetail(){
			this.detail=false;	
		},
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
		getShow(){
			if(this.filtergerner=="all"){
				return true;
			}
			for(let i=0;i<this.item.genre_ids.length-1;i++){
				if(this.item.genre_ids[i]==this.filtergerner){
					return true
				}
			}
			return false
		}
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
        background-color: #444;
		color: #222;
		font-size: 4rem
    }
    .yellow{
        color: yellow;
    } 
	.detail-container{
		position: fixed;
		width: 100%;
		height: 100vh;
		background-color:rgba(0,0,0,0.5);
		z-index: 999;
		top : 0;
		left: 0;
		.info{
			overflow: hidden;
			width: 60%;
			height: 80%;
			background-color:#333;
			border-radius: 3em;
			color: white;
			img{
				width: 100%;
				height:50%;
				object-fit: cover;
			}
			.text{
				padding: 10px 30px;
				height:50%;
				overflow-y:scroll;
				-ms-overflow-style: none;  /* Internet Explorer 10+ */
				scrollbar-width: none;
				.actor{
					img{
						width: 150px;
						height: 150px;
						border-radius:50%;
					}
				}
				p{
					padding: 0 20px;
					&.gener{
						padding: 0 5px;
					}
				}
				&::-webkit-scrollbar {
				width: 0;  /* Remove scrollbar space */
				height:0 ;
				background: transparent;  /* Optional: just make scrollbar invisible */
			}
			}
		}
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
