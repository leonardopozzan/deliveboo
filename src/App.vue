<template>
  <div>
 header-component
 main
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',

  components: {
    RouterView,
  },

}
</script>

<style lang="scss" scoped>

</style>