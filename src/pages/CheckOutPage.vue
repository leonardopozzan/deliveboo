<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <RedComponent></RedComponent>

        <div class="container container-monocard my-2 d-flex p-3">
            <div class="card-riepilogo d-flex col-9">
                <div class="card riepilogo-show col-12 p-2">
                    <h3 class="py-2 text-bold">Riepilogo</h3>
                    <div class="riepilogo-top d-flex justify-content-between">
                        <div class="info-restaurant d-flex">
                            <img src="/img/hamburger.jpg" alt="">
                            <div>
                                <h4 class="px-2">Nome Ristorante</h4>
                                <p class="px-2 text-uppercase">Indirizzo</p>
                                <p class="px-2 text-uppercase">Aperto</p>
                            </div>
                        </div>
                        <div class="info-logo d-flex">
                            <img class="img-logo" src="/img/rider-icon.png" alt="">
                            <div>
                                <h3 class="px-2 text-uppercase">Dishdrop delivery</h3>
                                <p class="px-2">I nostri raider sono più veloci di tutti</p>
                            </div>
                        </div>
                    </div>
                    <div class="riepilogo-down">
                        <h3 class="py-2 text-bold">Riepilogo</h3>
                        <form class="col-12 text-start">
                            <p class="mx-1 text-uppercase">Nome e cognome *</p>
                            <div class="input mb-2">
                                <input class="" type="text" name="name" id="name" placeholder="Nome e cognome" required>
                            </div>
                            <p class="mx-1 text-uppercase">E-mail</p>
                            <div class="input mb-2">
                                <input class="" type="text" name="email" id="email" placeholder="E-mail" required>
                            </div>
                            <p class="mx-1 text-uppercase">Indririzzo</p>
                            <div class="input mb-2">
                                <input class="" type="text" name="address" id="address" placeholder="Indirizzo"
                                    required>
                            </div>
                            <p class="mx-1 text-uppercase">Telefono</p>
                            <div class="input mb-5">
                                <input class="" type="text" name="telephone" id="telephone" placeholder="Telefono"
                                    required>
                            </div>
                            <h3 class="py-2 text-bold">Come vuoi pagare?</h3>
                            <a class="btn button credit-card mb-4"> <i class="fa-solid fa-credit-card"></i> Carta di
                                Credito</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container container-monocard my-5 p-3">
        <div class="card card-help col-9 p-3">
            <h3 class="py-2">Hai bisogno di un aiuto?</h3>
            <p>Per qualsiasi informazione puoi contattare il ristorante e il nostro servizio clienti</p>
            <div class="card-tel my-3 d-flex">
                <div class="icon col-1 text-center">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <div class="info-tel col-6">
                    <p>Chiama (nome ristorante) al +39 (numero ristorante)</p>
                </div>

            </div>
            <div class="card-email my-3 d-flex">
                <div class="icon col-1 text-center">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="info-email col-6">
                    <p>Invia una mail a (indirizzo email ristorante)</p>
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
    components: { HeaderComponent, RedComponent },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;

.container-monocard {
    width: 100%;
    height: 100%;

    // CARD CON FORM
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

            .riepilogo-down {
                form {
                    max-width: 100%;

                    .input {
                        max-width: 100%;

                        input {
                            border-radius: 10px;
                            width: 100%;
                            padding: 10px 12px;
                            font-size: 14px;
                            line-height: 16px;
                            border: 2px solid #fec7d7;
                        }

                    }

                    .input:not(:last-child) {
                        margin-bottom: 10px;
                    }

                    .credit-card {
                        background-image: linear-gradient(180deg, $red 0%, rgba(241, 78, 83, 0.7609418767507002) 66%, $orange 100%);
                        height: 60px;
                        width: 300px;
                        font-size: 28px;
                        text-align: center;
                    }
                }
            }
        }
    }

    // CARD CON INFO
    .card-help {
        .card-tel {
            .icon {
                .fa-phone {
                    font-size: 40px;
                }
            }
        }

        .card-email {
            .icon {
                .fa-envelope {
                    font-size: 40px;
                }
            }
        }
    }
}
</style>