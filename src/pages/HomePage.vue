<template>
    <div>
        <HeaderComponent></HeaderComponent>

        <JumboComponent></JumboComponent>

    </div>
</template>

<script>

import HeaderComponent from '../components/HeaderComponent.vue';
import JumboComponent from '../components/JumboComponent.vue';
export default {
    name: "HomePage",
    components: { HeaderComponent, JumboComponent }
}
</script>

<style lang="scss" scoped>

</style>