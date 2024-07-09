import { Fold } from '@element-plus/icons-vue/dist/types';
<template>
    <div class="header">
        <div class="header-title">
            <img src="../assets/images/LOGO.png" alt="LOGO" class="logo" />
            <span>XXXX管理系统</span>
        </div>
        <div class="shrink">
            <el-button type="info" size="small" color="#dedfe0" style="width: 20px; height: 20px"
                @click="updateIsCollapse">
                <ElIcon size="15">
                    <Fold />
                </ElIcon>
            </el-button>
        </div>
        <div class="My">
            <el-tooltip
        class="box-item"
        effect="dark"
        content="主题切换"
        placement="bottom"
      >
      <el-button size="small" circle class="theme" @click="updateTheme"></el-button>
      </el-tooltip>
            <el-avatar :icon="UserFilled" :size="30" style="margin: 0 10px 0 10px" />
            <el-dropdown size="small">
                <span class="el-dropdown-link" style="font-size: 12px">
                    <!-- {{store.state.user.username}} -->系统管理员
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup>
import store from '../store'
import { UserFilled } from '@element-plus/icons-vue'
import router from '../router';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

/**
 * 收缩和展开菜单栏
 */
function updateIsCollapse() {
    store.commit('updateCollapse')
}

/**
 * 退出登录
 */
function logOut(){
    sessionStorage.removeItem("user");
    Cookies.remove("token");
    store.commit('removeUser')
    ElMessage.success('用户退出!')
    router.push('/login')
}

</script>

<style scoped>
.header {
    margin: 0;
    padding: 0;
    height: 100%;
    border-bottom: 1px;
}

.header-title {
    float: left;
    width: 180px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 18px;
}

.header-title span {
    /* margin: 0 10px; */
    width: 100%;
    align-content: center;
    border-right-width: 0.5px;
    border-right-style: solid;
    border-right-color: #dedfe0;
}

.logo {
    width: 32px;
    height: 32px;
}

.shrink {
    float: left;
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 5px;
}

.My {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
}

.theme{
 background-image: url(../assets/images/月亮-fill.png);
 background-size: cover;
}
.theme:hover {
    background-color: #dedfe0;
}

.el-dropdown-link:focus,
.el-dropdown-link:hover {
    outline: none;
    /* 移除轮廓 */
    /* 防止浏览器聚焦样式：当一个元素获得焦点（例如，通过点击或键盘导航），
    浏览器会自动添加一个轮廓（outline）来提高可访问性，
    帮助视力不佳的用户或使用键盘导航的用户更容易看到当前焦点所在的位置。 */
    box-shadow: none;
    /* 移除阴影，以防万一 */
}
</style>