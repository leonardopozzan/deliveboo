<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <div class="container-fluid">
            <div class="slider-box container-lg py-4">
                <SliderComponent :types="types" :imgUrl="store.imagBasePath"></SliderComponent>
            </div>
            <div class="cards-box container-lg py-4">
                <div class="row g-3">
                    <RestaurantCardComponent v-for="(restaurant, i) in restaurants" :restaurant="restaurant"
                        :types=types>
                    </RestaurantCardComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import RestaurantCardComponent from '../components/RestaurantCardComponent.vue';
import { store } from '../store';
import SliderComponent from '../components/SliderComponent.vue';



export default {
    name: "Restaurants",
    components: { HeaderComponent, RestaurantCardComponent, SliderComponent },

    data() {
        return {
            restaurants: [],
            types: [],
            store,
        }
    },

    mounted() {
        this.getRestaurants();
        this.getRestaurantsTypes();
    },


    methods: {
        getRestaurants() {
            axios.get(this.store.apiBaseUrl + "/restaurants",store.data).then(response => {
                this.restaurants = response.data.results;
                console.log(response.data.results);
            });
        },

        getRestaurantsTypes() {
            axios.get(this.store.apiBaseUrl + "/types").then(response => {
                this.types = response.data.types
                console.log(response.data.types);
            });
        },


    },
    watch:{
        "store.data":{
            handler(){
                this.getRestaurants();
            },
            deep:true,
        }
    }
}



</script>

<style lang="scss" scoped>

</style>