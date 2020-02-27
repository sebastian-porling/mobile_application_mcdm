<template>
  <v-app>
    <!-- NAVIGATION BAR -->
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="KTH Logo"
          class="shrink mr-2"
          contain
          src="https://www.kth.se/polopoly_fs/1.77257.1550147376!/KTH_Logotyp_RGB_2013-2.svg"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <!-- CONTENT -->
    <v-content>
      <transition
        name="fade"
        mode="out-in"
        @before-enter="beforeEnter" appear
      >
      <router-view></router-view>
      </transition>
    </v-content>

    <!-- BOTTOM NAVIGATION -->
    <v-bottom-navigation :app="true">
    <v-btn value="back" @click="goBack()">
      <span>Back</span>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn value="restart" @click="startOver()">
      <span>Restart</span>
      <v-icon>mdi-refresh</v-icon>
    </v-btn>

    <v-btn value="next" @click="goNext()">
      <span>Next</span>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
  computed: {
    functions() {
      // We will see what `params` is shortly
      return this.$route.params.functions
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goNext() {
      window.history.length > 1 ? this.$router.go(1) : this.$router.push('/')
    },
    startOver(){
      this.$store.state.formQuestions = {functionsNeeded: [], questions: {competence: null, website: null, shortLived: null}};
      console.log(this.$store.state.formQuestions);
      this.$router.push('/')
    },
    beforeEnter () {
      this.$root.$emit('scrollBeforeEnter');
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-active{
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.mx-2{
	right: 20px;
	bottom: 80px;
}
</style>