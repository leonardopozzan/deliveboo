<template>
    <div class="col-12 col-lg-6 my-card">
        <div class="inner-card d-flex">
            <div class="img-box col-5">
                <img v-if="dish.image" :src="`${store.imagBasePath}${dish.image}`" alt="">
                <img v-else src="/img/dd-slide.png" alt="">
                <div class="price">{{ dish.price }} &nbsp;&euro; </div>
            </div>
            <div class="dish-info px-3 pt-2 col-7">
                <div class="fw-bold mb-1 text-capitalize">{{ dish.name }}</div>
                <div class="fst-italic">{{ dish.ingredients }}</div>
            </div>
            <button :disabled="cartKeys.includes(dish.slug)" :class="{ 'color-red': cartKeys.includes(dish.slug) }"
                @click="showAddOrBuy()">
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
        <div v-if="showAdd" class="additions-container">
            <div class="additions">
                <div class="inner-additions">
                    <i class="fa-solid fa-xmark" @click="closeAdd()"></i>
                    <h2 class="text-center">Scegli le tue aggiunte</h2>
                    <div class="addition" v-for="(addition, j) in dish.additions" @click="selectAdd(addition)">
                        <div class="col-6">{{ addition.name }}</div>
                        <div class="col-2">{{ addition.price }}&euro;</div>
                        <div class="col-2"><i class="fa-solid fa-plus"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {storeX} from '../store/index'
import Swal from 'sweetalert2';
import { store } from "../store";

export default {
    data() {
        return {
            store,
            showAdd: false,
        }
    },
    props:{
        dish: Object,
        restaurantSlug: String
    },
    computed: {
        cartKeys() {
            return storeX.getters.cartKeys
        }
    },
    methods: {
        selectAdd(addition){
            
        },
        showAddOrBuy(){
            if(this.dish.additions.length){
                this.showAdd = true
                store.showModal = true
            }else{
                this.tryAddToCart()
            }
        },
        tryAddToCart() {
            const isNotEmpty = !!storeX.getters.cartTotalItems
            if (isNotEmpty) {
                const restaurantId = storeX.getters.itemRestaurantId
                if (this.dish.restaurant_id != restaurantId) {
                    this.sendError()
                    return
                } else {
                    storeX.commit('addToCart', this.dish)
                    this.sendSuccess()
                    return
                }
            }
            storeX.commit('addToCart', this.dish)
            localStorage.setItem('restaurantSlug', this.restaurantSlug);
            this.sendSuccess()
        },
        sendSuccess() {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Il piatto è stato aggiunto all\'ordine',
                showConfirmButton: false,
                timer: 1500
            });
        },
        sendError() {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Non puoi ordinare da due ristoranti diversi',
                showConfirmButton: false,
                timer: 2000
            });
        },
        closeAdd(){
            this.showAdd = false
            store.showModal = false
        }
    },

}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;

.fa-solid.fa-xmark{
    cursor: pointer;
    position: absolute;
    top: 25px;
    left: 25px;
}
.fa-solid.fa-plus{
    font-size: 1.1rem;
    font-weight: bold;
}
.color-red{
    color: $red;
}
.my-card {
    .additions-container {

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1100;
        background-color: rgba(0, 0, 0, 0.3);

        .additions {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            overflow: hidden;
            background-color: $white;
            border-radius: 6px;
            -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
            z-index: 1150;
            padding: 32px;


           
            .inner-additions{
                overflow: auto;
                min-height: 286px;
                max-height: 400px;
                &::-webkit-scrollbar {
                // display: none;
                width: 3px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: $red;
                    border-radius: 30px;
                }

                &::-webkit-scrollbar-track {
                    background-color: $border-grey;
                    border-radius: 30px;
                }

                .addition {
                    margin: 10px;
                    padding: 16px;
                    text-transform: capitalize;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
    
    
                    &:hover {
                    cursor: pointer;
                    background-color: $white;
                    border-radius: 6px;
                    -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
    
                    .close {
                        display: block;
                    }
                }
                }
            }
        }
    }

    .color-red {
        color: $red !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    .inner-card {
        padding: 0.7rem;
        position: relative;
        background-color: $white;
        border-radius: 6px;
        cursor: pointer;
        height: 158px;
        -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);


        &:hover button {
            cursor: pointer;
            visibility: visible;
            opacity: 1;
        }

        &:hover .dish-info::-webkit-scrollbar {
            display: block;
        }

        &:hover .img-box img {
            transform: scale(1.1);
        }

        .img-box {
            // width: 140px;
            height: 136px;
            position: relative;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
                transition: all 1s cubic-bezier(.215, .61, .355, 1);
            }

            .price {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 75px;
                text-align: center;
                padding: 3px 3px;
                background-color: $red;
                color: $white;
                font-weight: $font-w-md;
            }

        }

        .dish-info {
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
                width: 3px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: $red;
                border-radius: 30px;
            }

            &::-webkit-scrollbar-track {
                background-color: $border-grey;
                border-radius: 30px;
            }



        }



        button {
            position: absolute;
            top: 10px;
            right: 10px;
            border: 0;
            background-color: $orange;
            height: 45px;
            width: 45px;
            border-radius: 50%;
            font-size: 1.2rem;
            color: $white;
            visibility: hidden;
            opacity: 0;
            transition: all 0.4s cubic-bezier(.215, .61, .355, 1);
        }

    }
}

@media (max-width: 576px) {
    .my-card {
        .inner-card {
            button {
                height: 38px;
                width: 38px;
                opacity: 1 !important;
                visibility: visible;
                font-size: 1rem;

            }
        }
    }


}
</style>