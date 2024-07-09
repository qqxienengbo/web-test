<template>
  <div style="width: 100%;">
    <div>
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action=""
        multiple
        :http-request="httpExcelRequest"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="upsuccess"
      >
      <template #trigger><el-button type="primary">导入</el-button></template>
        <el-button type="success" @click="dialogTableVisible=true" style="margin-left: 10px;">预览</el-button>
      </el-upload>
    </div>
    <div>
      <el-form label-width="100" style="max-width: 60%;margin: 0 auto;">
        <template v-for="item in labelList" :key="item">
          <el-form-item v-if="item.type == 'name'" :label="item.label">
            <el-input :placeholder="item.placeholder"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type == 'age'" :label="item.label">
            <el-input :placeholder="item.placeholder"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type == 'select'" :label="item.label">
            <el-select :placeholder="item.placeholder">
              <template v-for="option in item.options" :key="option">
                <el-option :label="option" :value="option" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item v-if="item.type == 'checkbox'" :label="item.label">
            <el-checkbox-group v-model="checkList">
              <template v-for="checkbox in item.checkboxs" :key="checkbox">
                <el-checkbox :label="checkbox" :value="checkbox" />
              </template>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-if="item.type=='text'" :label="item.label">
            <el-input type="textarea" :rows="item.rows" :placeholder="item.placeholder"></el-input>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div>
      <el-dialog
        v-model="dialogTableVisible"
        :title="filename"
        width="800"
      >
      <p v-show="isCorrect"  style="color: red">数据有误，请修改后请重新导入！</p>
        <el-table :data="excelList">
          <template v-for="item in labelList" :key="item.label">
            <el-table-column
              :prop="item.label"
              :label="item.label"
              :width="150"
            >
              <template #default="scope">
                <p v-if="scope?.row[item.label]" :style="{ color: shouldColorRed(scope.row[item.label],item) ? '' : 'red' }">
                  {{ scope.row[item.label] }}
                </p>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
  <script setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import * as xlsx from "xlsx";

let fileList = ref([]);
function upsuccess() {
  ElMessage.success({
    message: "上传成功!",
  });
}

const labelList = ref([
  {
    type: "name",
    label: "姓名",
    placeholder: "请输入姓名",
  },
  {
    type: "age",
    label: "年龄",
    placeholder: "不得小于18岁",
    min: 18,
    max: 100,
  },
  {
    type: "select",
    label: "学历",
    placeholder: "请选择最高学历",
    options: ["专科", "本科", "硕士", "博士"],
  },
  {
    type: "checkbox",
    label: "爱好",
    placeholder: "请选择爱好",
    checkboxs: ["阅读", "听歌", "打游戏", "游泳"],
  },
  {
    type: "text",
    label: "自我介绍",
    placeholder: "请介绍自己",
    rows: 4,
  },
]);

let dialogTableVisible = ref(false);
let excelList = ref([]);
let filename=ref('')

/**
 * 读取文件，获取excel数据
 * 
 * @param {*} op 
 */
const httpExcelRequest = async (op) => {
  // console.log(op.file);
  excelList.value=[];
  isCorrect.value=false;
  let file = op.file;
  filename.value=file.name;
  let dataBinary = await readFile(file);
  let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
  let workSheet = workBook.Sheets[workBook.SheetNames[0]];
  excelList.value = xlsx.utils.sheet_to_json(workSheet, { header: "1" });
  // console.log("excel表格数据=", excelList.value);
  dialogTableVisible.value = true;
};

/**
 * 读取文件，返回文件二进制内容
 */
const readFile = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target?.result);
    };
  });
};

let isCorrect=ref(false)
/**
 * 判断是否符合规则
 * 
 * @param {*} value 
 * @param {*} index 
 */
function shouldColorRed(value,formitem){
  if(formitem.type=='age'){
    const numValue=Number(value)
    if(numValue<18 || !Number.isInteger(numValue)){
      //不是整数或者小于18
      isCorrect.value=true;
      return false;
    }
  }
  if(formitem.type=='select'){
      if(!formitem.options.includes(value)){
          isCorrect.value=true;
          return false;
      }
  }
  if(formitem.type=='checkbox'){
    // 在excel中默认是用中文的分号、来填写多项
    // console.log("checkbox=",value)
    const items=value.split('、');
    // console.log("items=",items)
    // 判断填写的所有项是否都属于多选框中的项
    if(!items.every(items=>formitem.checkboxs.includes(items))){
      isCorrect.value=true;
      return false;
    }
  }
  return true
}
</script>