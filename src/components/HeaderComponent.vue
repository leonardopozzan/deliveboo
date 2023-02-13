<template>
  <Transition name="scroll">
    <nav class="navbar bg-white nav-position d-flex" v-show="showNav" :class="{ 'nav-block': $route.name != 'home' }">
      <div class="container-lg menu-box">

        <router-link to="/" class="navbar-brand">
          <img src="img/dish-drop-rb-01.png" alt="logo" width="80" height="80" />
        </router-link>


        <div class="menu-link">
          <router-link to="/restaurants">Tutti i Ristoranti </router-link>
          <router-link to="/reviewers">Scrivici una recenzione</router-link>
        </div>

        <Transition name="menu">
          <div class="navbar-menu dropdown-link" :class="{ 'open': showDropDown }">
            <router-link to="/restaurants">Tutti i Ristoranti </router-link>
            <router-link to="/reviewers">Scrivici una recenzione</router-link>
          </div>
        </Transition>

        <div class="hamburger" @click="menuToggle">
          <i class="fa-solid fa-bars"></i>
        </div>

      </div>

    </nav>
  </Transition>
</template>

<script>
export default {
  name: "HeaderComponent",

  data() {
    return {
      showNav: false,
      showDropDown: false,
    };
  },

  mounted() {
    if (this.$route.name === "home") {
      window.addEventListener("scroll", this.handleScroll);
    } else {
      this.showNav = true;
    }
  },


  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);

  },

  computed: {},

  methods: {
    handleScroll() {
      if (window.scrollY > 250) {
        this.showNav = true;
      } else {
        this.showNav = false;
      }
    },


    menuToggle() {

      this.showDropDown = !this.showDropDown;


    }

  },
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/__variables.scss" as *;

.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
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


  .menu-link,
  .dropdown-link {

    font-weight: $font-w-md;

    a:first-child {
      margin-right: 8px;
    }

  }

  .dropdown-link {
    display: none;
  }

  .hamburger {
    display: none;
  }

}

.nav-block {
  position: sticky;
}



@media (max-width: 768px) {

  .nav-position {


    .menu-box {
      position: relative;


      .menu-link {
        display: none;
      }

      .dropdown-link {

        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transform: translateY(100%);
        background-color: $white;
        text-align: center;
        transition: all 1s cubic-bezier(.215, .61, .355, 1);

        a {
          display: block;
          padding: 6px
        }

      }

      .open {
        max-height: 200px;
      }

      .hamburger {
        display: block;
        cursor: pointer;
      }

    }

  }
}
</style>
