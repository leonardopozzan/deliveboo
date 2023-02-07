<template>
    <div v-if="types.length" class="d-flex flex-wrap">
      <div v-for="(item,i) in filteredTypes" :key="item.id" class="col-4 " >
        <div class="card my-cards">
          <img class="img-type" :src="`http://127.0.0.1:8000/storage/${item.image}`" alt="Image">
          <div class="card-body triangolo">
            <h5 class="card-title">{{ item.name }}</h5>
          </div>
        </div>
      </div>
      
    </div>
    <div class="bottone">
        <button v-if="types.length >5" class="btn btn-primary" @click="showAll">Mostra di piu </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        types: [],
        showAllTypes: false,
        
      };
    },
    computed:{
filteredTypes(){
    return this.showAllTypes? this.types : this.types.slice(0,6); 
}
    },
    
    mounted() {
      axios.get("http://127.0.0.1:8000/api/types")
        .then(response => {
            console.log(response.data.types);
          this.types = response.data.types;
        });
    },
    methods:{
        showAll(){
            this.showAllTypes= true;
        }
    }
  };
  </script>
  <style lang="scss" scoped>
.my-cards{
    width:18rem;
    position:relative;

    .triangolo{
        position:absolute;
        color:white;

    }

}
</style>