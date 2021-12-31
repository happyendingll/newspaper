<template>
<!--  <img src="./assets/logo.png">-->
<!--  <div>-->
<!--    <p>-->
<!--      If Element Plus is successfully added to this project, you'll see an-->
<!--      <code v-text="'<el-button>'"></code>-->
<!--      below-->
<!--    </p>-->
<!--    <el-button type="primary">el-button</el-button>-->
<!--  </div>-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div id="app">
    <meta name="referrer" content="never">
  </div>
  <getData/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import getData from "./components/getData";

export default {
  name: 'App',
  components: {
    HelloWorld,
    getData
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
