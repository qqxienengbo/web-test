<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/Calculator">Calculator</router-link> |
    <router-link to="/UploadTest">UploadTest</router-link> |
    <el-button @click="out">退出</el-button>
  </nav>
  <router-view/> -->
  <!-- <Layout></Layout> -->
  <router-view/>
</template>

<script setup>
import { onMounted ,onBeforeMount} from "vue";
import Cookies from 'js-cookie';
import router from './router'


onBeforeMount(()=>{
  if(Cookies.get('token')){
    console.log("token",Cookies.get('token'))
  }else{
    router.push('/login')
  }
})
// onMounted(() => {
//   console.log(`the component is now mounted.`)
// })

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
