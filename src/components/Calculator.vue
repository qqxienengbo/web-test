<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-model="show"
    title="几何量的计算"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <div style="display: flex">
      <div style="display: flex; width: 80%; align-items: center">
        <div
          v-for="(item, index) in alert"
          :key="item"
          style="margin-left: 1%; position: relative; border-radius: 4px; border: 1px solid #999; padding: 12px"
        >
          <a style="position: absolute; top: 4px; right: 4px" @click="remove(index)">
            <el-icon><Close /></el-icon>
          </a>
          {{ item.title }} {{ item.volume }}
        </div>
      </div>
      <div>
        <p>总容积:</p>
        ={{ totalVolume }}(m3)
      </div>
    </div>
    <div style="margin-top: 2%; height: 400px">
      <el-tabs tabPosition="left">
        <el-tab-pane label="圆柱体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>圆柱容积：V=π×(D/2)^2×h</p>
              <p style="margin-left: 5%">输入：</p>
              <el-form :model="fromCylinder" label-width="">
                <el-form-item label="圆柱高度：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromCylinder.height" />
                </el-form-item>
                <el-form-item label="圆柱直径：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromCylinder.diameter" />
                </el-form-item>
              </el-form>
              <div style="margin-left: 50%">
                <el-button type="primary" size="small" @click="cylindricalCalculation()">计算</el-button>
              </div>
              <el-divider />
              <p>圆柱容积：{{ fromCylinder.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%; height: 100%" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="圆锥体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>圆锥容积：V=1/3 s×h=1/3×π×(D/2)^2×√(l^2-(D/2)^2 )</p>
              <p style="margin-left: 1%">默认条件：</p>
              <p style="margin-left: 1%">r = h * tan(θ/2)</p>
              <el-tabs v-model="tabsIndex" style="margin-left: 10%">
                <el-tab-pane label="h、r" name="first">
                  <p style="margin-left: 5%">输入：</p>
                  <el-form :model="fromCone" label-width="">
                    <el-form-item label="圆锥高度：" style="padding-right: 10%; padding-left: 10%" :required="true">
                      <el-input v-model="fromCone.height" />
                    </el-form-item>
                    <el-form-item label="圆锥直径：" style="padding-right: 10%; padding-left: 10%" :required="true">
                      <el-input v-model="fromCone.diameter" />
                    </el-form-item>
                  </el-form>
                  <div style="margin-left: 50%">
                    <el-button type="primary" size="small" @click="conicalVolume1()">计算</el-button>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="h、θ" name="second">
                  <p style="margin-left: 5%">输入：</p>
                  <el-form :model="fromCone" label-width="">
                    <el-form-item label="圆锥高度：" style="padding-right: 10%; padding-left: 10%" :required="true">
                      <el-input v-model="fromCone.height" />
                    </el-form-item>
                    <el-form-item label="圆锥角度：" style="padding-right: 10%; padding-left: 10%" :required="true">
                      <el-input v-model="fromCone.angle" />
                    </el-form-item>
                  </el-form>
                  <div style="margin-left: 50%">
                    <el-button type="primary" size="small" @click="conicalVolume2()">计算</el-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <el-divider />
              <p>圆锥容积：{{ fromCone.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%; height: 100%" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="椭圆体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>椭圆容积：V=π/24Di^3+π/4Di^2h</p>
              <p style="margin-left: 1%">默认条件：</p>
              <p style="margin-left: 1%">Di>2000，h=40</p>
              <p style="margin-left: 1%">Di≤2000，h=25</p>
              <p style="margin-left: 5%">输入：</p>
              <el-form :model="fromElliptic" label-width="">
                <el-form-item label="Di：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromElliptic.diameter" />
                </el-form-item>
              </el-form>
              <div style="margin-left: 50%">
                <el-button type="primary" size="small" @click="ellipticVolume()">计算</el-button>
              </div>
              <el-divider />
              <p>椭圆容积：{{ fromElliptic.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="锥形体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>锥形容积：如图</p>
              <p style="margin-left: 1%">默认条件：</p>
              <p style="margin-left: 1%">D=2R：</p>
              <p style="margin-left: 1%">d=2r：</p>
              <p style="margin-left: 5%">输入：</p>
              <el-form :model="fromTaper" label-width="">
                <el-form-item label="圆锥高度：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromTaper.height" placeholder="请输入圆锥高度" size="small" />
                </el-form-item>
                <el-form-item label="圆锥直径(d)：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromTaper.shortDiameter" placeholder="请输入圆锥直径(d)" size="small" />
                </el-form-item>
                <el-form-item label="圆锥直径(D)：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromTaper.longDiameter" placeholder="请输入圆锥直径(D)" size="small" />
                </el-form-item>
              </el-form>
              <div style="margin-left: 50%">
                <el-button type="primary" size="small" @click="taperVolume()">计算</el-button>
              </div>
              <el-divider />
              <p>锥形容积：{{ fromTaper.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="球冠(拱顶)体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>球冠容积：V=πh^2(Do-h/3)</p>
              <p style="margin-left: 1%">默认条件：</p>
              <p style="margin-left: 1%">Ᵹn=0</p>
              <p style="margin-left: 5%">输入：</p>
              <el-form :model="fromVault" label-width="">
                <el-form-item label="Do：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromVault.diameter" placeholder="请输入Do" size="small" />
                </el-form-item>
              </el-form>
              <div style="margin-left: 50%">
                <el-button type="primary" size="small" @click="vaultVolume()">计算</el-button>
              </div>
              <el-divider />
              <p>球冠容积：{{ fromVault.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="半球体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>半球容积：V=1/12πDi^3</p>
              <p style="margin-left: 5%">输入：</p>
              <el-form :model="fromHemisphere" label-width="">
                <el-form-item label="Di：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromHemisphere.diameter" placeholder="请输入Di" size="small" />
                </el-form-item>
              </el-form>
              <div style="margin-left: 50%">
                <el-button type="primary" size="small" @click="hemisphericalVolume()">计算</el-button>
              </div>
              <el-divider />
              <p>半球容积：{{ fromHemisphere.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="蝶形体积计算">
          <div style="display: flex">
            <div style="width: 60%">
              <p>蝶形容积：V=1/3 s×h=1/3×π×r^2×√(l^2-r^2 )</p>
              <p style="margin-left: 1%">默认条件：</p>
              <p style="margin-left: 1%">Di>2000，h=40</p>
              <p style="margin-left: 1%">Di≤2000，h=25</p>
              <p style="margin-left: 5%">输入：</p>
              <el-form :model="fromDished" label-width="">
                <el-form-item label="Di：" style="padding-right: 10%; padding-left: 10%" :required="true">
                  <el-input v-model="fromDished.diameter" placeholder="请输入Di" size="small" />
                </el-form-item>
              </el-form>
              <div style="margin-left: 50%">
                <el-button type="primary" size="small" @click="dishedVolume()">计算</el-button>
              </div>
              <el-divider />
              <p>碟形容积：{{ fromDished.volume }}</p>
            </div>
            <div style="width: 40%">
              <img src="" style="width: 100%; height: 50%" />
              <img src="" style="width: 100%; height: 50%" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-divider />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="cleanUp">清除</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,reactive} from 'vue';

const show = ref(true)

const emit = defineEmits(['close']);

const alert = ref([]);

const totalVolume = ref(null);

// 圆柱体的参数
const fromCylinder = reactive({
  height: '',//高度
  diameter: '',//直径
  volume: null,//容积
  heightUnit: 'm',
  // 直径单位
  diameterUnit: 'm',
});

//圆锥体的参数
const fromCone = reactive({
  height: '',//高度
  diameter: '',//直径
  angle: '',//圆锥侧面与底面之间的角度
  volume: null,//容积
  heightUnit: 'm',
  // 直径单位
  diameterUnit: 'm',
  angleUnit: 'm',
});

// 椭圆体的参数
const fromElliptic = reactive({
  diameter: '',
  diameterUnit: 'm',
  volume: null,
});

// 圆锥台的参数
const fromTaper = reactive({
  height: '',//高度
  shortDiameter: '',//短直径
  longDiameter: '',//长直径
  volume: null,//容积
});

// 球冠体的参数
const fromVault = reactive({
  diameter: '',//直径或长度
  volume: null,//容积
});

// 半球体的参数
const fromHemisphere = reactive({
  diameter: '',//直径
  volume: null,//容积
});

// 蝶形体的参数
const fromDished = reactive({
  diameter: '',//直径或长度
  volume: null,//容积
});

const tabsIndex = ref('first');

function handleClose() {
  emit('close', false);
}

/**
 * 体积求和
 */
function volumetricFusion() {
  let volume = 0;
  alert.value.forEach((item) => {
    volume += parseFloat(item.volume);
  });
  totalVolume.value = volume.toFixed(2) / 1000000000;
}

/**
 * 通过下标删除元素
 *
 * @param index 删除的下标
 */
function remove(index) {
  alert.value.splice(index, 1);
  volumetricFusion();
}

/**
 * 清除所有的数据
 */
function cleanUp() {
  fromCylinder.height = '';
  fromCylinder.diameter = '';
  fromCylinder.volume = null;

  fromCone.height = '';
  fromCone.diameter = '';
  fromCone.angle = '';
  fromCone.volume = null;

  fromElliptic.diameter = '';
  fromElliptic.volume = null;

  fromTaper.height = '';
  fromTaper.shortDiameter = '';
  fromTaper.longDiameter = '';
  fromTaper.volume = null;

  fromVault.diameter = '';
  fromVault.volume = null;

  fromHemisphere.diameter = '';
  fromHemisphere.volume = null;

  fromDished.diameter = '';
  fromDished.volume = null;

// 记录各容器的容积
  alert.value = [];
  totalVolume.value = null;
}

/**
 * 计算圆柱的容积
 */
function cylindricalCalculation() {
  const { height, diameter } = fromCylinder;
  if (height === '' || isNaN(diameter) || diameter === '') {
    fromCylinder.volume = null;
  } else {
    fromCylinder.volume = (Math.PI * Math.pow(diameter / 2, 2) * height).toFixed(2);
    alert.value.push({
      title: '圆柱容积:',
      volume: fromCylinder.volume,
    });
    volumetricFusion();
  }
}
/**
 * 已知高度和直径，计算圆锥的容积
 */
function conicalVolume1() {
  const { height, diameter } = fromCone;
  if (height === '' || isNaN(diameter) || diameter === '') {
    fromCone.volume = null;
  } else {
    fromCone.volume = ((Math.PI * Math.pow(diameter / 2, 2) * height) / 3).toFixed(2);
    alert.value.push({
      title: '圆锥容积:',
      volume: fromCone.volume,
    });
    volumetricFusion();
  }
}

/**
 * 已知高度和角度，计算圆锥的容积
 */
function conicalVolume2() {
  const { height, angle } = fromCone;
  if (height === '' || isNaN(angle) || angle === '') {
    fromCone.volume = null;
  } else {
    // 利用正切tan(圆锥侧面与底面之间角度的一半)=半径/高度,计算出半径
    const radius = height * Math.tan(angle / 2);
    fromCone.v = ((Math.PI * Math.pow(radius, 2) * height) / 3).toFixed(2);
    alert.value.push({
      title: '圆锥容积:',
      volume: fromCone.volume,
    });
    volumetricFusion();
  }
}

/**
 * 计算椭圆体的容积
 */
function ellipticVolume() {
  console.log(fromElliptic);
  const { diameter } = fromElliptic;
  let h;
  if (diameter > 2000) {
    h = 40;
  } else {
    h = 25;
  }

  if (diameter === '' || diameter === undefined) {
    fromElliptic.volume = null;
  } else {
    fromElliptic.volume = (Math.PI / 24) * Math.pow(diameter, 3) + (Math.PI / 4) * Math.pow(diameter, 2) * h;
    alert.value.push({
      title: '椭圆容积:',
      volume: fromElliptic.volume.toFixed(2),
    });
    volumetricFusion();
  }
}

/**
 * 计算锥体（圆锥台）的容积
 */
function taperVolume() {
  const { height, shortDiameter, longDiameter } = fromTaper;
  const r = shortDiameter / 2;
  const R = longDiameter / 2;
  if (height === '' || isNaN(shortDiameter) || isNaN(longDiameter) || height === '' || shortDiameter === '' || longDiameter === '') {
    fromTaper.volume = null;
  } else {
    fromTaper.volume = ((1 / 3) * Math.PI * height * (Math.pow(R, 2) + Math.pow(r, 2) + R * r)).toFixed(2);
    alert.value.push({
      title: '锥形容积:',
      volume: fromTaper.volume,
    });
    volumetricFusion();
  }
}

/**
 * 计算球冠容积
 */
function vaultVolume() {
  const { diameter } = fromVault;
  if (diameter === '' || diameter === undefined) {
    fromVault.v = null;
  } else {
    const h = diameter - Math.sqrt(Math.pow(diameter, 2) - Math.pow((diameter - 0) / 2, 2));
    fromVault.volume = Math.PI * Math.pow(h, 2) * (diameter - h / 3);
    alert.value.push({
      title: '球冠容积:',
      volume: fromVault.volume.toFixed(2),
    });
    volumetricFusion();
  }
}

/**
 * 计算半球体的容积
 */
function hemisphericalVolume() {
  const { diameter } = fromHemisphere;
  if (diameter === '' || diameter === undefined) {
    fromHemisphere.volume = null;
  } else {
    fromHemisphere.volume = (1 / 12) * Math.PI * Math.pow(diameter, 3);
    alert.value.push({
      title: '半球容积:',
      volume: fromHemisphere.volume.toFixed(2),
    });
    volumetricFusion();
  }
}

/**
 * 计算碟形体的容积
 */
function dishedVolume() {
  const { diameter } = fromDished;
  let h;
  if (diameter > 2000) {
    h = 40;
  } else {
    h = 25;
  }
  if (diameter === '' || diameter === undefined) {
    fromDished.volume = null;
  } else {
    const Theta = Math.acos((diameter / 2 - 0.1 * diameter) / (diameter - 0.1 * diameter));
    const C1 = Math.sin(Theta) / 4;
    const C2 = (Math.sin(Theta) * Math.cos(Theta) + Theta) / 2 - Math.sin(Theta);
    const C3 = Math.sin(Theta) * 2 - Math.pow(Math.sin(Theta), 3) / 3 - (Math.sin(Theta) * Math.cos(Theta) - Theta);
    const C4 = ((Math.sin(Theta) + 2) * Math.pow(1 - Math.sin(Theta), 2)) / 3;
    fromDished.volume =
      Math.PI *
      (C1 * Math.pow(diameter, 2) * (0.1 * diameter) +
        C2 * diameter * Math.pow(0.1 * diameter, 2) +
        C3 * Math.pow(0.1 * diameter, 3) +
        C4 * Math.pow(diameter, 3) +
        (Math.pow(diameter, 2) / 4) * h);

    alert.value.push({
      title: '碟形容积:',
      volume: fromDished.volume.toFixed(2),
    });
    volumetricFusion();
  }
}
</script>
