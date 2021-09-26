<template>
  <div id="app" class="container-fluid px-0">
    <Header 
    :genres="genres"
    @search="getsearch"
    @filtergerne="filtergerne"
    class="header"
    />
    <main class="container-fluid px-0">
      <div v-for="(element,index) in elenco" :key="index">
        <h2>
          {{element}}
        </h2>
        <Row
        :search="search"
        :id="element"
        :genres="genres"
        :filtergerner="filtergerner"
        />
      </div>
    </main>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Row from './components/Row.vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)

export default {
  name: 'App',
  components: {
    Header,
    Row,
  },
  data(){
    return {
      elenco:["movie","tv"],
      search:"",
      genres:[],
      filtergerner:"all"
    }
  },
  created(){
    let movie;
    let tv;
    axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=d372f19f679767467d9a71f921e1c8f4").then(response => {
      movie = response.data.genres;
      axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=d372f19f679767467d9a71f921e1c8f4").then(response => {
        tv=(response.data.genres);
        for (let i = 0; i < movie.length-1; i++) {
          for (let j = 0; j < tv.length-1;) {
            if(movie[i].id==tv[j].id){
              tv.splice(j, 1);
            }
            else{
              j++;
            }
          }
        }
        this.genres = [ ...movie, ...tv ];
      });
    });
  },
  methods:{
    getsearch(info){
      this.search=info;
    },
    filtergerne(info){
      console.log("app")
      this.filtergerner=info
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
  height: calc(100vh - 100px);
  padding-bottom: 100px;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;
}
h2{
  padding: 0 20px;
  font-weight: 700;
}
main::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    height:0 ;
    background: transparent;  /* Optional: just make scrollbar invisible */
}

#app{
  overflow: hidden;
  background-color:#222 ;
}
</style>
