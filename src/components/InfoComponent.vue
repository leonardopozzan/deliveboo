<template>
    <h2>Cibo a domicilio per veri FoodLovers</h2>
    <p>Voglia di pizza o hamburger? Oppure oggi sei da cucina fusion? Essere food lovers vuol dire sperimentare sapori nuovi ogni giorno ! Ricevi il cibo a domicilio più adatto alla tua giornata !</p>
    <div class="d-flex  flex-wrap  align-items-center  justify-content-evenly">
        <div v-for="(image,index) in pathHomeImg" :key="index" class="col-5  my-3 my-info">
            <img class="info-img" :src="image.img" alt="">
            <div class="triangolo">
          
            </div>
            <div class="info-info">
                 <h3>{{ image.title }}</h3> 
                <p>{{ image.desc }}</p>
            </div>
        </div>
        
            
        </div>


    
    
</template>

<script>

import { pathHomeImg } from '../data/data';
    export default {
        data(){
            return{
                pathHomeImg: pathHomeImg,
            }
        },
       
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_mixins' as *;
@use '../assets/styles/partials/_variables' as *;
h2{
    color:$red;
}
.my-info{
    position:relative;
    overflow:hidden;
    
    .info-img{
        max-width: fit-content;
        width: 670px;
        height: 425px;
        object-fit: cover
    }
    .triangolo{

        @include triangolo(425px,540px);
        top:0;
        left:0;
        
    }
    .info-info{
        position:absolute;
        top:10px;
        left:10px;
        color:$white;
        width:300px;
        text-shadow:2px 2px $black ;
    }
}

</style>