<template>
  <div id="app">
    <div id="nav">
      <div>Base Base</div>
      <router-link to="/">Home</router-link> |
      <router-link to="/subapp1">Subapp1</router-link>
    </div>
    <div class="app-view-box">
      <div id="SubAppContainer" v-html="content"></div>
    </div>
    <!-- <router-view/> -->
  </div>
</template>
<script>
export default {
  name: "App",
  props: {
    loading: Boolean,
    content: String
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app-view-box {
  width: 100%;
  border: 1px solid red;
}
</style>
