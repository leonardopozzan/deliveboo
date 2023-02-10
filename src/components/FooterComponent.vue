<template>
    <div class="container-fluid footer-container">
        <div class="container-lg py-4">
            <div class="primary-section d-flex justify-content-between align-items-center">
                <div class="col-2">
                    <img src="/img/dish-drop-rw-01.png" alt="logo">
                </div>
                <div class="col-2 icons d-flex justify-content-between">
                    <a href="#nogo"><i class="fa-brands fa-square-facebook"></i></a>
                    <a href="#nogo"><i class="fa-brands fa-square-instagram"></i></a>
                    <a href="#nogo"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#nogo"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="second-section">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="text-white menu-list" v-for="(item, index) in FooterMenu">
                        <h4 class="mb-3">{{ item.title }}</h4>
                        <ul class="text-white">
                            <li class="mb-2" v-for="(obj, j) in item.voices"><a href="#nogo">{{ obj }}</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FooterMenu } from '../data/data';


export default {
    name: 'FooterComponent',

    data() {
        return {
            FooterMenu: FooterMenu,
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;

.footer-container {
    background-color: $dark;


    .icons {
        font-size: 1.5rem;
        color: $white;
    }


    .menu-list {
        padding: 16px 24px;
    }
}
</style>