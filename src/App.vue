<template>
  <div id="app" class="container-fluid">
    <Header 
    @search="getsearch"
    class="header"
    />
    <main class="container-fluid">
      <div v-if="movies.length!=0">
        <h2>
          Movie
        </h2>
        <Movies
        
        :movies="movies"/>
      </div>
      <div v-if="series.length!=0">
        <h2>
          Series
        </h2>
        <Series
        :series="series"/>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header.vue'
import Movies from './components/Movies.vue'
import Series from './components/Series.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)

export default {
  name: 'App',
  components: {
    Header,
    Movies,
    Series,
  },
  data(){
    return {
      APIUrl:"https://api.themoviedb.org/3/search/",
      movie: "movie",
      tv: "tv",
      key:"?api_key=d372f19f679767467d9a71f921e1c8f4",
      querry: "&query=",
      movies:[],
      series:[],
    }
  },
  methods: {
    getMovie(){
      axios.get(this.APIUrl+this.movie+this.key+this.querry).then(response => {
        this.movies=response.data.results;
      })
      axios.get(this.APIUrl+this.tv+this.key+this.querry).then(response => {
        this.series=response.data.results;
      })
    },
    getsearch(info){
      this.querry="&query="+info;
      if(this.querry!="&query="){
        this.getMovie();
      }
    }
  }  
}
</script>

<style lang="scss">
@import "@/style/general.scss";

.header{
  height: 100px;
}
main{
  min-height: calc(100vh - 100px);
  div{
    overflow: hidden;
  }
}
#app{
  background-color:#434343 ;
}
</style>
