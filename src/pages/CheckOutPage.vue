<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <RedComponent></RedComponent>

        <div class="container container-monocard my-2 d-flex p-3">
            <div class="card-riepilogo d-flex col-9">
                <div class="card riepilogo-show col-12 p-2">
                    <h3 class="text-bold">Riepilogo</h3>
                    <div class="riepilogo-top d-flex justify-content-between">
                        <div class="info-restaurant d-flex">
                            <!-- <img src="http://via.placeholder.com/150x100" alt=""> -->
                            <img class="pippo" src="/img/hamburger.jpg" alt="">
                            <div>
                                <h3 class="px-2">Nome Ristorante</h3>
                                <p class="px-2 text-uppercase">Indirizzo</p>
                                <p class="px-2 text-uppercase">Aperto</p>
                            </div>
                        </div>
                        <div class="info-logo d-flex">
                            <!-- <img src="http://via.placeholder.com/150x100" alt=""> -->
                            <img class="img-logo" src="/img/rider-icon.png" alt="">
                            <div>
                                <h3 class="px-2 text-uppercase">Dishdrop delivery</h3>
                                <p class="px-2">I nostri raider sono più veloci di tutti</p>
                            </div>
                        </div>
                    </div>
                    <div class="riepilogo-down">
                        <div class="form">

                        </div>

                    </div>

                </div>

            </div>
        </div>
        <div class="container container-monocard my-2 d-flex p-3">
            <div class="card-riepilogo d-flex col-9">

                <div class="card card-image-show col-12">
                    Riepilogo
                    <!-- <img src="http://via.placeholder.com/640x360" alt=""> -->
                </div>

            </div>

        </div>
    </div>

</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import RedComponent from '../components/RedComponent.vue';

export default {
    name: "CheckOutPage",
    components: { HeaderComponent, RedComponent }
}
</script>

<style lang="scss" scoped>
.container-monocard {
    width: 100%;
    height: 100%;
    border: 1px solid black;

    .card-riepilogo {
        .riepilogo-show {
            .riepilogo-top {
                .info-restaurant {
                    img {
                        width: 200px;
                        height: 100px;
                    }
                }

                .info-logo {
                    img {
                        width: 100px;
                        height: 100px;
                    }
                }

            }
        }
    }
}
</style>