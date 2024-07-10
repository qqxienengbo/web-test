import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

export default createStore({
  state: {
    return:{
      isCollapse:true,
      user:{},
      //这个数组在外面只能用stroe.state.return.tabs来获取
      tabs:[
        {
          title:'首页',
          router:'/Calculator'
        },
      ],
      nowrouter:'/'
    }
  },
  getters: {
  },
  mutations: {
    updateCollapse(state){
      state.isCollapse=!state.isCollapse;
    },
    setUser(state,user){
      state.user=user
    },
    removeUser(state){
      state.user={}
    },
    /**
     * 删除对应的标签页
     * @param {*} state 
     * @param {*} targetTitle 
     */
    removeTab(state,targetRouter){
      for(let i=0;i<state.return.tabs.length;i++){
        if(state.return.tabs[i].router===targetRouter){
          state.return.tabs.splice(i,1)
          // 删除了这个标签页后,自动跳转到前一个标签页
          state.nowrouter=state.return.tabs[i-1].router
          router.push(state.return.tabs[i-1].router)
          break;
        }
      }
    },
    /**
     * 添加标签页
     * @param {*} state 
     * @param {*} tragetTab 
     */
    addTab(state,targetTab){
      for(let i=0;i<state.return.tabs.length;i++){
        if(state.return.tabs[i].router===targetTab.router){
          return
        }
      }
      state.return.tabs.push(targetTab);
      state.nowrouter=targetTab.router;
    },
/**
 * 记录当前路由
 */
    setNowRouter(state,router){
      state.nowrouter=router;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState(),
  ]
})
