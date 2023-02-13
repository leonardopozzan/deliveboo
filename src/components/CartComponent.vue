<template>
    <div class="my-cart">
          <div class="inner-cart">
            <h2 class="text-center">Il tuo ordine</h2>
            <div>
              <div v-for="(item, i) in store.cart" class="cart-item">
                <div class="img-box"><img :src="`${store.imagBasePath}${item.image}`" ></div>
                <div class="text-capitalize me-3">{{ item.name }} </div>
                <div>
                    <button @click="addQuantity(item,i)"> + </button>
                    <span class="px-2">{{ item.quantity }}</span>
                    <button @click="removeQuantity(item,i)"> - </button>
                </div>
              </div>
            </div>
            <div>{{ store.totalPrice }}</div>
          <div class="text-center"> <button @click="clearCart()">Resetta</button> <router-link :to="{name : 'check-out'}"><button>Compra</button></router-link></div>
        </div>

       

    </div>
</template>

<script>
import { store } from '../store'
    export default {
        data(){
            return{
                store,
            }
        },
        methods:{
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
</script>

<style lang="scss" scoped>

 @use '../assets/styles/partials/_variables' as *;
.my-cart{   
    padding: 0 1rem 1rem 1rem;

    .inner-cart{
        background-color: $white;
        
            button{
                border: 0;
                background-color: $white;
                border-radius: 10px;
                &:hover{
                    background-color: $orange;
                }
            }
            .cart-item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1rem 1rem 1rem;
            }
            .img-box{
                width: 90px;
                border-radius: 20px;
                overflow: hidden;
                margin-right: 15px;
            }
    }
}
</style>