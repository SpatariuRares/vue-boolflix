<template>
  <ul class="row d-flex p-0 flex-nowrap">
      <li v-for="(movie,index) in movies" :key="index" class="col-2">
          <div>
              <div class="poster" v-if="movie.poster_path">
                <img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"  alt="">
              </div>
              <div class="poster not_film" v-else>

              </div>
                <country-flag :country='getFlag(movie.original_language)' size='small'/>
                {{movie.original_title}}
                <div > 
                    <font-awesome-icon icon="star" v-for="(n,index) in 5" :class="getActive(movie.vote_average,n)" :key="index"/>
                </div>
          </div>
      </li>
  </ul>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
    name: 'Movies',
    props:["movies"],
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
        .poster{
            width: 100%;
            aspect-ratio: 9/15;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .not_film{
        background-color: gray;
    }
    .yellow{
        color: yellow;
    } 
}
</style>
