<template>
    <!-- Slider main container -->
    <swiper :modules="modules" :slides-per-view="1" :space-between="10" :breakpoints="{
        '425': {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        '768': {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        '1024': {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        '1400': {
            slidesPerView: 5,
            spaceBetween: 20,
        },
    }" navigation @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="(type, i) in  types">
            <div class="slide-image" @click="getRestaurantbyTypes(type.id)">
                <img :src="`${imgUrl}${type.image}`" alt="">
                <div class="slide-type">
                    <h6>{{ type.name }}</h6>
                </div>
            </div>

        </swiper-slide>
        <swiper-slide>
            <div class="slide-image" @click="resetType()">
                <img src="/img/dd-slide.png" alt="alltype">
                <div class="slide-type">
                    <h6>Guarda tutti i ristoranti</h6>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { store } from '../store';
import axios from 'axios';
import { Navigation } from 'swiper'
import 'swiper/scss';
import 'swiper/scss/navigation';


export default {

    name: 'SliderComponent',

    components: {
        Swiper,
        SwiperSlide,
    },

    props: ['types', 'imgUrl'],

    data() {
        return {
            store,
        }
    },


    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation],
        };
    },
    methods: {
        getRestaurantbyTypes(id) {
            store.data.params.typeFilter = id;
            console.log(store.data.params.typeFilter);
        },
        resetType() {
            store.data.params.typeFilter = '';
        }
    }

}



</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;


.swiper {
    .swiper-slide {
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;

        .slide-image {
            height: 134px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }


            .slide-type {
                background-color: rgba(255, 255, 255, 0.6);
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;

                h6 {
                    padding: 4px 6px;
                    margin: 0;
                    text-transform: capitalize;
                    font-weight: $font-w-md;
                    margin-left: 12px;
                }
            }
        }

    }

}
</style>