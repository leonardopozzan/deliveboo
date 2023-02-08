<template>
    <div>
        <HeaderComponent></HeaderComponent>

        <JumboComponent></JumboComponent>
        <main class="container" >
            <section id="types">
                <TypeCardComponent></TypeCardComponent>

            </section>
          

          

        </main>

    </div>
</template>

<script>
import axios from "axios";
import HeaderComponent from '../components/HeaderComponent.vue';
import JumboComponent from '../components/JumboComponent.vue';
import TypeCardComponent from '../components/TypeCardComponent.vue';
import{store} from '../store';
export default {
    name: "HomePage",
    components: { HeaderComponent, JumboComponent, TypeCardComponent },
    data(){
        return{
            store,
            types:[],
        };
    },
    mounted(){
        this.fetchTypes();
    },
    methods:{
        async fetchTypes(){
            try{
                const response=await axios.get('http://127.0.0.1:8000/api/types');
                this.types=response.data;
            }catch(error){
                console.error(error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#types{
    padding:30px 0;
}
</style>