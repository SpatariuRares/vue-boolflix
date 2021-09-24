<template>
  <div id="app" class="container-fluid px-0">
    <Header 
    @search="getsearch"
    class="header"
    />
    <main class="container-fluid px-0">
      <div v-for="(element,index) in elenco" :key="index">
        <h2>
          {{element}}
        </h2>
        <Movies
        :id="element"/>
      </div>
    </main>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Movies from './components/Movies.vue'
//import Series from './components/Series.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)

export default {
  name: 'App',
  components: {
    Header,
    Movies,
  },
  data(){
    return {
      elenco:["movie","tv"],
    }
  },
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
main::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    height:0 ;
    background: transparent;  /* Optional: just make scrollbar invisible */
}

#app{
  overflow: hidden;
  background-color:#434343 ;
}
</style>
