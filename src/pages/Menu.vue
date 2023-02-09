<template>
    <div>
    <HeaderComponent></HeaderComponent>
<RedComponent></RedComponent>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import RedComponent from '../components/RedComponent.vue';
import axios from 'axios';
import {store} from '../store';


export default {
    name: "Menu",
    components: { HeaderComponent, RedComponent },
    data(){
        return{
            store,
        }
    },
    mounted(){
        axios.get(`${this.store.apiBaseUrl}/restaurants/${this.$route.params.slug}`).then((response)=>{
            console.log(response.data.results);
            if(response.data.success){
                this.restaurant=response.data.results;

            }else{
                this.$forceUpdate.push({name: 'notfound'});
            }
        });
    }

}
</script>

<style lang="scss" scoped>

</style>