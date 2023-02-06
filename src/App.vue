<template>
  <div>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',

  components: {
    RouterView,
    FooterComponent,
  },

}
</script>

<style lang="scss" scoped>

</style>