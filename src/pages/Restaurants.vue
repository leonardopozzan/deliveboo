<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <div class="container-fluid">
            <div class="container-lg py-4">
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



export default {
    name: "Restaurants",
    components: { HeaderComponent, RestaurantCardComponent },

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
            axios.get(this.store.apiBaseUrl + "/restaurants").then(response => {
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
}



</script>

<style lang="scss" scoped>

</style>