<template>
  <ul class="row d-flex p-0 flex-nowrap">
      <li v-for="(serie,index) in series" :key="index" class="col-2">
          <div>
              <div class="poster"  v-if="serie.poster_path">
                <img :src="`https://image.tmdb.org/t/p/w342${serie.poster_path}`" alt="">
              </div>
              <div class="poster not_film" v-else>

              </div>
            <country-flag :country='getFlag(serie.origin_country[0])' size='small'/>
            {{serie.name}}
            {{serie.vote_average}}
          </div>
      </li>
  </ul>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
    name: 'series',
    props:["series"],
    components: {
        CountryFlag,
    },
    methods:{
        getFlag(language){
            if(language=="en")return "gb"
            return language
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
                object-fit: contain;
            }
        }
    }
}
</style>
