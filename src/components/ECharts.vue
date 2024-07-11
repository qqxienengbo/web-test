<template>
    <div style="width: 100%;height: 100%;">
      <div style="display: flex;">
        <div id="testECharts1" style="flex-grow: 1; height: 300px;float: left;"></div>
        <div id="testECharts2" style="width: 300px; height: 300px;float: left"></div>
      </div>
      <div id="testECharts3" style="flex-grow: 1;height: 300px;display: flex;"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted,ref } from 'vue';

let timerId;
window.onresize=(()=>{
  clearTimeout(timerId);
  timerId=setTimeout(()=>{
    console.log("窗口大小改变");
  },500)
})

let myChart1 = ref(null);
let myChart2 = ref(null);
let myChart3 = ref(null);
// 在 setup() 执行时，组件的 DOM 还未被创建，所以不能通过document.getElementById获取到对应的DOM
onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
myChart1.value = echarts.init(document.getElementById('testECharts1'));
myChart2.value = echarts.init(document.getElementById('testECharts2'));
myChart3.value = echarts.init(document.getElementById('testECharts3'));


/**
 * setInterval:重复执行一个指定的函数或代码块
 */
setInterval(() => {
  option2.series[0].data = makeRandomData();//每次都调用方法返回随机的数据
  myChart2.value.setOption(option2);//返回后应用到这里展示
}, 2000);

// 绘制渐变堆叠面积图
myChart3.value.setOption(option3);

// 绘制图表
myChart1.value.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
})
function makeRandomData() {
  return [
    {
      value: Math.random(),//保证每次生成随机数
      name: 'A'
    },
    {
      value: Math.random(),
      name: 'B'
    },
    {
      value: Math.random(),
      name: 'C'
    }
  ];
}
// 初始化数据
let option2 = {
  series: [
    {
      type: 'pie',
      radius: [0, '50%'],
      data: makeRandomData()
    }
  ]
};

let option3 = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
};

</script>