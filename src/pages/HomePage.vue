<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <h1>HomePage</h1>
        <div class="test">

        </div>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';

export default {
    name: "HomePage",
    components: { HeaderComponent }
}
</script>

<style lang="scss" scoped>
.test {
    height: 110vh;
}
</style>