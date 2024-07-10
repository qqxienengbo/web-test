<template>
    <el-menu
      :default-active="store.state.nowrouter"
      :router="true"
      class="el-menu-vertical-demo"
      :collapse="store.state.isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="handlSelect"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/" id="/" data-label="首页">首页</el-menu-item>
          <el-menu-item index="/Calculator" id="/Calculator" data-label="计算容积">计算容积</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/UploadTest" id="/UploadTest" data-label="上传">上传</el-menu-item>
          <el-menu-item index="/UploadExcel" id="/UploadExcel" data-label="预览">预览</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </template>

<script setup>
import { ref } from 'vue'
import store from '../store'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = () => {

}
const handleClose = () => {
//   console.log(key, keyPath)
}
const handlSelect=(router)=>{
  store.commit('addTab',{title:document.getElementById(router).innerHTML,router:router});
  store.commit('setNowRouter',router)
}
</script>

<style>
.el-menu-vertical-demo{
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>