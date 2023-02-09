<template>
    <div class="jumbo-restaurant">
        <div class="container">
            <img class="img-logo ms-4" src="../assets/img/dishdrop-bianco-arancione.png" alt="">
        </div>
        <div class="restaurant-name">
            <div class="container">

            </div>
        </div>
    </div>



</template>

<script>
import axios from 'axios';
import{store} from '../store';
    export default {
       data(){
        return{
            store,
            
        }
       },
      
    
    }
        
       
       
    

</script>

<style lang="scss" scoped>

.jumbo-restaurant{
    background-color: red;
    width: 100%;
    position:relative;
    .img-logo{
        width:70px;
        
    }
    

}

</style>