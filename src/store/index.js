import { createStore } from "vuex";

function updateLocalStorage(cart){
    localStorage.setItem('cart' , JSON.stringify(cart))
}

export const storeX = createStore({
    state:{
        cart: [],
        storageKeys : [],
    },
    getters:{
        productQuantity : state => product => {
            const item = state.cart.find(i => i.id === product.id)
            if(item) return item.quantity
            else return null
        },
        cartItems: state => {
            return state.cart   
        },
        cartTotalPrice: state => {
            return state.cart.reduce((a,b) => a + (b.price * b.quantity), 0).toFixed(2)
        },
        cartKeys : state => {
            return state.storageKeys
        },
        cartTotalItems: state => {
            return state.cart.reduce((a,b) => a + b.quantity, 0)
        },

    },
    mutations:{
    addToCart(state, product){
        let item = state.cart.find(i => i.id === product.id)
        if(item){
            item.quantity++
        }else{
            state.cart.push({...product, quantity : 1})
            state.storageKeys.push(product.slug)
        }

        updateLocalStorage(state.cart)
    },
    removeFromCart(state, product){
        let item = state.cart.find(i => i.id === product.id)
        if(item){
            if(item.quantity > 1){
                item.quantity--
            }else{
                state.cart = state.cart.filter(i => i.id !== product.id)
                state.storageKeys = state.storageKeys.filter(i => i !== product.slug)
            }
        }
        updateLocalStorage(state.cart)

    },
    deleteFromCart(state, product){
        state.cart = state.cart.filter(i => i.id !== product.id)
        state.storageKeys = state.storageKeys.filter(i => i !== product.slug)
        updateLocalStorage(state.cart)
    },
    updateCartFromLocalStorage(state){
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            state.cart = cart
            if (cart.length) {
                for (let i = 0; i < cart.length; i++) {
                    state.storageKeys.push(cart[i].slug);
                }
            }
        }
    },
    resetCart(state){
        state.cart = [];
        state.storageKeys = []
        
    }
    },
    actions:{

    },
    modules:{

    },
})