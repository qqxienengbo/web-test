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

// 防抖
const debounce = (fn, delay) => {
  let timer = null;//用于存储setTimeout返回的定时器ID，这样可以通过clearTimeout来取消未执行的延时调用。
  return function () {
    let context = this;//保存当前上下文(this)
    let args = arguments;//包含了函数调用时所有传入的参数
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
 
const _ResizeObserver = window.ResizeObserver;//保存原生的ResizeObserver构造函数，以备后续使用。
//定义一个新的ResizeObserver类，继承自原生的ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  // 覆写构造函数，接受一个callback参数，这是观察到元素尺寸变化时将要执行的回调函数。
  constructor(callback) {
    callback = debounce(callback, 16);//防抖处理，延时16毫秒后执行。
    super(callback);//调用父类的构造函数，将防抖处理后的callback作为参数传递
  }
}

</script>

<style scoped>
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
.main{
  background:linear-gradient(to bottom,var(--bg1),var(--bg2));
}
</style>
