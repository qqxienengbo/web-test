<template>
  <div class="common-layout" style="min-height: 97vh;">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
            <!-- <template>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="true"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu>
        </template> -->
        aaaa
        </el-aside>
        <el-container>
          <el-main style="min-height:460px ;">
            <nav>
              <router-link to="/">Home</router-link> |
              <router-link to="/Calculator">Calculator</router-link> |
              <router-link to="/UploadTest">UploadTest</router-link> |
              <router-link to="/UploadExcel">UploadWxcel</router-link> |
              <el-button @click="out">退出</el-button>
            </nav>
            <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Cookies from "js-cookie";
import router from "../router";

function out() {
  sessionStorage.removeItem("user");
  Cookies.remove("token");
  router.push("/login");
}
</script>