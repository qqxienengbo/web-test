<template>
    <el-menu
      default-active="2"
      :router="true"
      class="el-menu-vertical-demo"
      :collapse="store.state.isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/Calculator">计算容积</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="/UploadTest">上传</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="">
          <template #title><span>预览</span></template>
          <el-menu-item index="/UploadExcel">预览</el-menu-item>
        </el-sub-menu>
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
//   console.log(key, keyPath)
}
const handleClose = () => {
//   console.log(key, keyPath)
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