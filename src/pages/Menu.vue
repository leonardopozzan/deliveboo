<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <RedComponent></RedComponent>
    <div class="container py-3"  v-if="menu">
      <div class="d-flex judtify-content-center align-items-center box-info">
        <div class="restaurant-img-box col-4 p-2">
          <img :src="`${store.imagBasePath}${menu.image}`" :alt="menu.name" />
        </div>
        <div class="ms-3">
          <h4>{{ menu.name }}</h4>
          <span v-for="(tipo, index) in menu.types" class="text-capitalize">
            {{ index<menu.types.length - 1 ? tipo.name + ", " : tipo.name }} </span>
              <div v-if="isIntervalActive()">
                <span class="text-success"><i class="fa-solid fa-circle text-success"> </i>Ristorante aperto</span>
              </div>
              <div v-else>
                <span class="text-danger"><i class="fa-solid fa-circle text-danger"> </i> Ristorante chiuso ,
                  preordina</span>
              </div>
        </div>
      </div>
      <button @click="clearCart()">Clear</button>
      <div class="d-flex">
        <div>
          <div v-for="(dish, i) in menu.dishes">
            {{ dish.name }} <button :disabled="Object.keys(vueLocalStorage).includes(dish.slug)" @click="tryAddToCart(dish)"><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>
        <div>
          <div v-for="(item, i) in store.cart">
            {{ item.restaurant_id + ' ' + item.name + ' '+ item.quantity}} <button @click="addQuantity(item,i)"> + </button> <button @click="removeQuantity(item,i)"> - </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import RedComponent from "../components/RedComponent.vue";
import axios from "axios";
import { store } from "../store";
import Swal from 'sweetalert2';

export default {
  name: "Menu",
  components: { HeaderComponent, RedComponent },
  data() {
    return {
      store,
      menu: null,
      types: [],
      vueLocalStorage : window.localStorage
    };
  },
  mounted() {
    this.getDishes();
    store.cart = this.getAllCart
    console.log(store.cart)
  },
  computed: {
    getAllCart() {
      let storage = []
      let keys = Object.keys(localStorage)
      for(let i= 0; i < keys.length; i++){
        storage.push(JSON.parse(localStorage.getItem(keys[i])))
      }
      return storage;
      }
  },
  methods: {
    getDishes() {
      axios
        .get(`${this.store.apiBaseUrl}/restaurants/${this.$route.params.slug}`)
        .then((response) => {
          console.log(response.data.results);
          if (response.data.success) {
            this.menu = response.data.results;
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
    tryAddToCart(dish){
      console.log(localStorage)
      if(localStorage.length){
        const keys = Object.keys(localStorage)
        const restaurantId =  JSON.parse(localStorage.getItem(keys[0])).restaurant_id
        if(dish.restaurant_id != restaurantId){
          this.sendError()
          return
        }else{
          this.addToCart(dish)
          return
        }
      }
      this.addToCart(dish)
    },
    addToCart(dish){
      dish.quantity = 1
      store.cart.push(dish)
      localStorage.setItem(dish.slug, JSON.stringify(dish))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Il piatto è stato aggiunto all\'ordine',
        showConfirmButton: false,
        timer: 1500
      });
    },
    sendError(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Non puoi ordinare da due ristoranti diversi',
        showConfirmButton: false,
        timer: 2000
      });
    },
    addQuantity(dish,i){
      store.cart[i].quantity++
      const item = JSON.parse(localStorage.getItem(dish.slug))
      item.quantity++
      localStorage.setItem(dish.slug, JSON.stringify(item))
    },
    removeQuantity(dish,i){
      const item = JSON.parse(localStorage.getItem(dish.slug))
      item.quantity--
      if(item.quantity){
        localStorage.setItem(dish.slug, JSON.stringify(item))
        store.cart[i].quantity--
      }else{
        localStorage.removeItem(dish.slug)
        store.cart.splice(i,1)
      }
    },
    clearCart(){
      localStorage.clear()
      store.cart = [];
    }
    
  },
};
</script>

<style lang="scss" scoped>
.box-info {
  border: 1px solid rgba(99, 98, 98, 0.346);
  border-radius: 10px;
  width: 70%;
}
</style>
