<template>
    <Transition name="scroll">
        <nav class="navbar bg-white nav-position" v-show="showNav"
            v-if="$route.name === 'restaurants' ? showNav = true: ''"
            :class="$route.name === 'restaurants' ? 'nav-block': ''">
            <div class="container-lg">
                <a class="navbar-brand" href="#">
                    <img src="../assets/img/dishdrop-nero-arancione.png" alt="logo" width="80" height="80">
                </a>
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
        window.addEventListener('scroll', this.handleScroll);
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