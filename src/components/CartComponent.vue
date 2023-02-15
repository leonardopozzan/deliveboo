<template>
    <div class="my-cart">

        <div class="inner-cart d-flex flex-column justify-content-between">
            <i class="fa-solid fa-arrow-left" @click="store.cartShow = false"></i>
            <h2 class="text-center">Il tuo ordine</h2>
            <div class="py-3 items-box">
                <div v-for="(item, i) in store.cart" class="cart-item">
                    <div class="img-box">
                        <img v-if="item.image" :src="`${store.imagBasePath}${item.image}`">
                        <img v-else src="/img/dd-slide.png" alt="">
                    </div>
                    <div class="text-capitalize me-3">{{ item.name }} </div>
                    <div class="d-flex">
                        <button @click="removeQuantity(item, i)"> - </button>
                        <span class="px-2">{{ item.quantity }}</span>
                        <button @click="addQuantity(item, i)"> + </button>
                    </div>
                </div>
            </div>
            <div>{{ store.totalPrice }}</div>
          <div class="text-center"> <button @click="clearCart()">Resetta</button> </div>

            <div class="text-center cart-buttons" v-if="store.cart.length >= 1"> <button
                    @click="clearCart()">Resetta</button>
                <router-link :to="{name : 'check-out'}"><button>Compra</button></router-link>
            </div>
            <div class="cart-buttons text-center" v-else>Aggiungi un prodotto per ordinare</div>


        </div>



    </div>
</template>

<script>
import { store } from '../store'
export default {
    data() {
        return {
            store,
        }
    },
    methods: {
        addQuantity(dish, i) {
            store.cart[i].quantity++
            const item = JSON.parse(localStorage.getItem(dish.slug))
            item.quantity++
            localStorage.setItem(dish.slug, JSON.stringify(item))
        },
        removeQuantity(dish, i) {
            const item = JSON.parse(localStorage.getItem(dish.slug))
            item.quantity--
            if (item.quantity) {
                localStorage.setItem(dish.slug, JSON.stringify(item))
                store.cart[i].quantity--
            } else {
                localStorage.removeItem(dish.slug)
                store.cart.splice(i, 1)
            }
        },
        clearCart() {
            localStorage.clear()
            store.cart = [];

            },
            getTotal () {
                let total = 0
                for (let i = 0; i < store.cart.length; i++) {
                    total += store.cart[i].price * store.cart[i].quantity
                }
                store.totalPrice = total
            }

        },
        watch: {
            'store.cart': {
            handler() {
                this.getTotal()
            },
            deep: true
            }
        },
        mounted(){
            this.getTotal()


        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;

.my-cart {
    padding: 0 1rem 1rem 1rem;

    .inner-cart {

        min-height: 286px;
        max-height: 624px;
        overflow: hidden;
        padding: 16px;
        background-color: $white;
        border-radius: 6px;
        -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
        position: relative;




        .items-box {
            max-height: calc(624px - 160px);
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }
        }


        i {
            display: none;
        }


        button {
            border: 0;
            background-color: $white;
            border-radius: 10px;

            &:hover {
                background-color: $orange;

            }
        }

        .cart-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;

            &:hover {
                cursor: pointer;
                background-color: $white;
                border-radius: 6px;
                -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
            }
        }

        .img-box {
            width: 90px;
            border-radius: 6px;
            overflow: hidden;
            margin-right: 15px;
            flex-shrink: 0;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }


        .cart-buttons {

            button {
                margin-top: 8px;
                padding: 6px 12px;
                border-radius: 6px;
                background-color: transparent;
                transition: all 0.4s cubic-bezier(.215, .61, .355, 1);

                &:first-child {
                    margin-right: 12px;
                }

                &:hover {
                    background-color: $red;
                    color: white;
                }
            }
        }
    }
}



@media (max-width: 1224px) {


    .my-cart {

        .inner-cart {


            position: relative;

            i {
                display: block !important;
                position: absolute;
                top: 24px;
                left: 24px;
                cursor: pointer;
            }

        }
    }
}



@media (max-width: 768px) {


    .my-cart {

        .inner-cart {

            .cart-item {

                padding: 8px;
            }

            .img-box {
                display: none;
            }

        }


    }
}
</style>