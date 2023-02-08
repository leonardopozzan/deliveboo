<template>
  <h2>Cosa Mangiamo oggi ?</h2>
  <p>Beh se la scelta non è ovvia questa e la selezione delle pietanze più ordinate dalla community di FoodLover come te!</p>
  <div v-if="types.length" class="d-flex flex-wrap row g-2">
    
    <div v-for="(item, i) in filteredTypes" :key="item.id" class="col-4">
      <router-link to="/restaurants" > 
      <div class="card my-cards m-4">
        <div class="img-typebox">

          <img
            class="img-type"
            :src="`http://127.0.0.1:8000/storage/${item.image}`"
            :alt="item.name"
          />
        </div>
        <div class="card-body triangolo">
          
        </div>
        <div>
          <h5 class="type-title" >{{ item.name =='pizzeria'? 'pizza':item.name }}</h5> 
        </div>
      </div>
    </router-link>
    </div>
   
  </div>

  <div class="bottone my-5">
    <button v-if="types.length > 5" class="btn btn-primary" @click="showAll">
      {{ showAllTypes ? "Mostra Meno" : "Mostra di più" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      types: [],
      showAllTypes: false,
    };
  },
  computed: {
    filteredTypes() {
      return this.showAllTypes ? this.types : this.types.slice(0, 6);
    },
  },

  mounted() {
    axios.get("http://127.0.0.1:8000/api/types").then((response) => {
      console.log(response.data.types);
      this.types = response.data.types;
    });
  },
  methods: {
    showAll() {
      this.showAllTypes = !this.showAllTypes;
    },
  },
};
</script>
<style lang="scss" scoped>
@use '../assets/styles/partials/_mixins' as *;
@use '../assets/styles/partials/_variables' as *;
h2{
  color:$red;
}

.my-cards {
  width: 18rem;
  position: relative;
  overflow:hidden;
  .img-typebox{
    width: 100%;
    height: 186px;
    

  
  .img-type {
   
    width: 100%;
    height: 100%;
    display:block;
    object-fit: cover;
    
  }
}

  .triangolo {
    @include triangolo(192px,200px);
    
    
  }
  .type-title {
      color:white;
    position:absolute;
    top:10px;
    left:10px;
    text-transform: capitalize;
    }
}
.bottone {
  text-align: center;
}
</style>
