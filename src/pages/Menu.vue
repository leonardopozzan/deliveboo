<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <RedComponent></RedComponent>
    <div class="container py-3">
      <div class="d-flex judtify-content-center align-items-center box-info">
        <div class="restaurant-img-box col-4 p-2">
          <img :src="`${store.imagBasePath}${menu.image}`" :alt="menu.name" />
        </div>
        <div class="ms-3">
          <h4>{{ menu.name }}</h4>
          <span v-for="(tipo, index) in menu.types" class="text-capitalize">
            {{ index < menu.types.length - 1 ? tipo.name + ", " : tipo.name }}
          </span>
          <div v-if="isIntervalActive()">
            <span class="text-success"
              ><i class="fa-solid fa-circle text-success"
                > </i
              >Ristorante aperto</span
            >
          </div>
          <div v-else>
            <span class="text-danger"
              ><i class="fa-solid fa-circle text-danger"
                > </i
              > Ristorante chiuso , preordina</span
            >
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

export default {
  name: "Menu",
  components: { HeaderComponent, RedComponent },
  data() {
    return {
      store,
      menu: [],
      types: [],
    };
  },
  mounted() {
    this.getDishes();
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
        if(!this.menu ||!this.menu.opening_hours || !this.menu.closing_hours){
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

<style lang="scss" scoped>
.box-info {
  border: 1px solid rgba(99, 98, 98, 0.346);
  border-radius: 10px;
  width: 70%;
}
</style>
