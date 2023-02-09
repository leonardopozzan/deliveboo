<template>
    <div class="col-sm-6 col-lg-4">
     <router-link :to="{name:'menu', params:{slug:restaurant.slug}}">
            <div class="card-box">
                <div class="card-image">
                    <img :src="`${store.imagBasePath}${restaurant.image}`" :alt="restaurant.name">
                    <div class="preorder" v-if="!isIntervalActive()">
                        <span>Preordina</span>
                        <span>Apre alle ore {{ restaurant.opening_hours.slice(0, 5) }}</span>
                    </div>
                </div>
                <div class="card-info p-3">
                    <h5 class="mb-1">{{ restaurant.name }}</h5>
                    <span v-for="(type, i) in restaurant.types" class="text-capitalize">

                    {{(i < (restaurant.types.length - 1)) ? type.name + ', ' : type.name  }} </span>
                </div>
            </div>
     </router-link>
    </div>
</template>

<script>
import { store } from '../store';


export default {
    name: 'RestaurantCardComponent',

    data() {
        return {
            store,
        }
    },

    props: ['restaurant', 'types'],

    methods: {
        isIntervalActive() {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTime = currentHours + currentMinutes / 60;
            const openingTime = parseInt(this.restaurant.opening_hours.split(":")[0]) + parseInt(this.restaurant.opening_hours.split(":")[1]) / 60;
            const closingTime = parseInt(this.restaurant.closing_hours.split(":")[0]) + parseInt(this.restaurant.closing_hours.split(":")[1]) / 60;
            return currentTime >= openingTime && currentTime <= closingTime;
        }
    },
}

</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;


.card-box {

    height: 305px;
    border-radius: 6px;
    padding: 0;
    overflow: hidden;
    background-color: $white;
    padding-bottom: 6px;
    cursor: pointer;

    -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);


    .card-image {
        width: 100%;
        height: 186px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }


        .preorder {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 6px 18px;
            background-color: $red;
            color: $white;
            -webkit-box-shadow: -2px -2px 5px 2px rgba(0, 0, 0, 0.52);
            box-shadow: -2px -2px 5px 2px rgba(0, 0, 0, 0.52);

            span {
                display: block;
                text-align: center;

                &:first-child {
                    font-weight: $font-w-lg;
                }
            }
        }
    }


    .card-info {

        h5 {
            color: $red;
            font-size: $font-md;
            font-weight: $font-w-lg;
        }

        span {
            color: grey;
            font-size: $font-sl;
            font-weight: $font-w-md;
        }
    }

}
</style>