<template>
    <Transition name="scroll">
        <nav class="navbar bg-white nav-position d-flex" v-show="showNav"
            :class="{ 'nav-block': $route.name != 'home'  }">
            <div class="container-lg">
                <router-link to="/" class="navbar-brand">
                    <img src="img/dish-drop-rb-01.png" alt="logo" width="80" height="80">
                </router-link>
                <div>
                <router-link to="/restaurants">TUTTI I RISTORANTI </router-link>
                
                
            </div>
            </div>
           
        </nav>
    </Transition>
</template>

<script>
export default {
    name: 'HeaderComponent',


    data() {
        return {

            showNav: false,

        }
    },


    mounted() {
        if (this.$route.name === 'home') {
            window.addEventListener('scroll', this.handleScroll);
        } else {
            this.showNav = true;
        }
    },


    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    computed: {
    },


    methods: {
        handleScroll() {

            if (window.scrollY > 250) {
                this.showNav = true;
            } else {
                this.showNav = false;
            }

        }

    },

}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/__variables.scss' as *;


.scroll-enter-active,
.scroll-leave-active {
    transition: all 0.6s cubic-bezier(.215, .61, .355, 1);
}

.scroll-enter-from,
.scroll-leave-to {
    transform: translateY(-100%);
}

.nav-position {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
}

.nav-block {
    position: sticky;
}
</style>