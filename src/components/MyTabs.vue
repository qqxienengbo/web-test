<template>
  <div>
    <el-tabs
      v-model="store.state.nowrouter"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-click="clickTab"
      style="height: auto;width: auto;"
    >
    <template v-for="item in store.state.return.tabs" :key="item.title">
        <el-tab-pane :label="item.title" :name="item.router" :closable="(item.title!=='首页')">
        </el-tab-pane>
    </template>
    </el-tabs>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import store from '../store'
import router from '../router';

onBeforeMount(()=>{

})

let activeName = ref('/')
function removeTab(router){
    store.commit('removeTab',router)
    activeName.value=store.state.nowrouter
}

function clickTab(pane,ev){
    activeName.value=pane.props.name
    store.commit('setNowRouter',activeName.value)
    //页面跳转
    router.push(activeName.value)
}

</script>

<style scoped>
.el-tabs {
  --el-tabs-header-height: 25px;
}
</style>