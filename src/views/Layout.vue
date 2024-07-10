<template>
  <div class="common-layout" style="min-height: 97vh;">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside style="width: auto;">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <MyTabs></MyTabs>
          <el-main style="min-height:460px ;">
            <router-view />
          </el-main>
          <el-footer><span>Copyright © 2022 - present ContiNew Admin 版权所有 · 津ICP备2022005864号-3</span></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Cookies from "js-cookie";
import router from "../router";
import Menu from "../components/Menu.vue"
import Header from "../components/Header.vue"
import MyTabs from "../components/MyTabs.vue"
import { ref } from "vue";


</script>

<style scoped>
.el-header {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #dedfe0;
}

.el-main {
  display: flex;
  align-items: center;
}

.el-footer {
  display: flex;
  align-items: center;
  min-height: 40px;
  /* justify-content: center; */
  /* align-content: center; */
  height: 40px;
  width: 100%;
}

.el-footer span {
  width: 100%;
  text-align: center;
  font-size: 10px;
}
</style>