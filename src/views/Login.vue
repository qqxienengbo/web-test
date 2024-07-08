<template>
    <div class="login">
  <el-tabs type="border-card">
    <el-tab-pane label="登录">
        <el-form>
            <el-form-item label="用户名">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="" @click="login()">登录</el-button>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import request from "../util/request";
import Cookies from 'js-cookie';
import router from '../router';



let user=reactive({
    username:'',
    password:''
})


function login(){
    localStorage.removeItem("user")
    request.post("/user/login",user).then(res=>{
        if(res.code==='0'){
            sessionStorage.setItem("user",JSON.stringify(res.data));
            // 把token存到Cookies,有效期1天
            Cookies.set("token",res.data.token,{ expires: 1 });
            ElMessage.success("登录成功！")
            router.push('/')
        }
    })
}
</script>

<style>
.login{
    width: 400px;
    margin: 0 auto;
}
</style>

