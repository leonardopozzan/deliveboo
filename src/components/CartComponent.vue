<template>
    <div>
        <button @click="clearCart()">Clear</button>
          <div >
            <div>
              <div v-for="(item, i) in store.cart">
                {{ item.restaurant_id + ' ' + item.name + ' '+ item.quantity}} <button @click="addQuantity(item,i)"> + </button> <button @click="removeQuantity(item,i)"> - </button>
              </div>
            </div>
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>