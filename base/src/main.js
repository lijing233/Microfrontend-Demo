import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// qiankun
import { registerMicroApps, start } from "qiankun";

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

let app = null;
/**
 * 渲染函数
 * appContent 子应用html内容
 * loading 子应用加载效果，可选
 */
function render({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

function initApp() {
  render({ appContent: "", loading: true });
}

initApp();

// 传入子应用的数据
let msg = {
  data: {
    auth: false,
  }
};
// 注册子应用
registerMicroApps(
  [
    {
      name: "subapp1",
      entry: "//localhost:8888",
      render,
      activeRule: genActiveRule("/subapp1"),
      props: msg,
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("before load", app);
      },
    ], 
    // 挂载前回调
    beforeMount: [
      (app) => {
        console.log("before mount", app);
      },
    ], 
    // 挂载后回调
    afterMount: [
      (app) => {
        console.log("after mount", app);
      },
    ], 
    // 卸载后回调
    afterUnmount: [
      (app) => {
        console.log("after unload", app);
      },
    ], 
  }
);

// 设置默认子应用,与 genActiveRule中的参数保持一致
// setDefaultMountApp("/app1");

// 启动
start();
