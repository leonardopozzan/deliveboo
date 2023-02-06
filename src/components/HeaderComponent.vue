<template>
    <nav class="navbar bg-white nav-position" v-show="showNav">
        <div class="container-lg">
            <a class="navbar-brand" href="#">
                <img src="../assets/img/dishdrop-nero-arancione.png" alt="logo" width="80" height="80">
            </a>
        </div>
    </nav>
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


.nav-position {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

.scrolled {
    transform: translateY(0);
}
</style>