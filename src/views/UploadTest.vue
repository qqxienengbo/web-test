<template>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://localhost:8888/user/uploadtest"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="upsuccess"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>
  </template>
  <script setup>
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'

  let fileList=ref([])
  function upsuccess(){
    ElMessage.success({
        message:"上传成功!"
    })
  }
  </script>