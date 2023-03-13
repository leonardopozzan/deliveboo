<template>
  <div id="box-primary">
    <HeaderComponent></HeaderComponent>
    <RedComponent></RedComponent>
    <div class="container py-3" v-if="menu">
      <div class="d-flex flex-wrap justify-content-between">

        <div class="menu">

          <div>
            <div class="d-flex align-items-center box-info">
              <div class="restaurant-img-box col-4 p-2">
                <img :src="`${store.imagBasePath}${menu.image}`" :alt="menu.name" />
              </div>
              <div class="ms-3">
                <h4>{{ menu.name }}</h4>
                <span v-for="(tipo, index) in menu.types" class="text-capitalize">
                  {{ index<menu.types.length - 1 ? tipo.name + ", " : tipo.name }} </span>
                    <div v-if="isIntervalActive()">
                      <span class="text-success"><i class="fa-solid fa-circle text-success"> </i>Ristorante
                        aperto</span>
                    </div>
                    <div v-else>
                      <span class="text-danger"><i class="fa-solid fa-circle text-danger"> </i> Ristorante chiuso apre
                        alle {{ menu.opening_hours.slice(0, 5) }},
                        preordina</span>
                    </div>
              </div>
            </div>
            <div class="row g-3 mt-3">
                <DishComponent v-for="(dish, i) in menu.dishes"  :key="i" :dish="dish" :restaurantSlug="menu.slug"/>
            </div>
          </div>

        </div>

        <div class="cart-box">
          <CartComponent />
        </div>

        <!-- <div v-for="(category, i) in categories" :key="i">
                                                          <div v-if="restaurantCategories.includes(category.name)">
                                                            <h2 class="title" >{{ category.name }}</h2>
                                                            <div class="d-flex flex-wrap">
                                                              <div  v-for="(dish,j) in menu.dishes" :key="j" class="col-12 col-md-6 col-lg-4">
                                                                <div class="my-card " v-if="category.name == dish.category.name" >{{ dish.name }} </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div> -->
        <!-- <div v-for="(item, i) in restaurantMenu" :key="i">
                                                          <h2 class="title" >{{ item.category }}</h2>
                                                          <div class="d-flex flex-wrap">
                                                            <div  v-for="(dish,j) in item.dishes" :key="j" class="col-12 col-md-6 col-lg-4">
                                                              {{ dish.name }}
                                                            </div>
                                                          </div>
                                                        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import RedComponent from "../components/RedComponent.vue";
import DishComponent from "../components/DishComponent.vue";

import axios from "axios";
import { store } from "../store";
import CartComponent from "../components/CartComponent.vue";
import {storeX} from '../store/index'

export default {
  name: "Menu",
  components: { HeaderComponent, RedComponent, CartComponent , DishComponent},
  data() {
    return {
      store,
      menu: null,
      categories: [],
      restaurantCategories: [],
      restaurantMenu: null,
    };
  },
  mounted() {
    this.getDishes();
    this.getCategories();
  },
 
  methods: {
    getDishes() {
      axios
        .get(`${this.store.apiBaseUrl}/restaurants/${this.$route.params.slug}`)
        .then((response) => {
          console.log(response.data.results);
          if (response.data.success) {
            this.menu = response.data.results;

            // console.log(this.menu)
            // const restaurantMenu = [];
            // const item = {
            //     category : '',
            //     dishes : []
            //   }
            // for(let i = 0; i<this.menu.dishes.length ; i++){
            //   if(i == 0){
            //     item.category = this.menu.dishes[i].category.name
            //   }

            //   if(item.category == this.menu.dishes[i].category.name){
            //     item.dishes.push(this.menu.dishes[i])
            //   }else{
            //     restaurantMenu.push(item)
            //     item.category = this.menu.dishes[i].category.name
            //     item.dishes = []
            //   }
            // }
            // this.restaurantMenu = restaurantMenu
          } else {
            this.$router.push({ name: "notfound" });
          }
        });
    },
    getCategories() {
      axios
        .get(`${this.store.apiBaseUrl}/categories`)
        .then((response) => {
          // console.log(response.data.categories);
          if (response.data.success) {
            this.categories = response.data.categories;
          } else {
            this.$router.push({ name: "notfound" });
          }
        });
    },
    isIntervalActive() {
      if (!this.menu || !this.menu.opening_hours || !this.menu.closing_hours) {
        return false;
      }
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHours + currentMinutes / 60;
      const openingTime = parseInt(this.menu.opening_hours.split(":")[0]) + parseInt(this.menu.opening_hours.split(":")[1]) / 60;
      const closingTime = parseInt(this.menu.closing_hours.split(":")[0]) + parseInt(this.menu.closing_hours.split(":")[1]) / 60;
      return currentTime >= openingTime && currentTime <= closingTime;
    },
    
  },
};
</script>

<style lang="scss">
@use '../assets/styles/partials/_variables' as *;

.menu {
  width: 65%;
  display: flex;
  align-items: flex-start;

  .box-info {
    border: 1px solid rgba(99, 98, 98, 0.346);
    border-radius: 10px;
  }
}


.cart-box {
  width: 35%;
}

.title {
  text-transform: capitalize;
}




@media (max-width: 1199px) {


  #box-primary {

    position: relative;
    height: 100%;

    .menu {
      width: 100%;
      display: block !important;
    }

  }

}



</style>
