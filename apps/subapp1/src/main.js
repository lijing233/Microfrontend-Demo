import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

let instance = null;

function render() {
  instance = new Vue({
      router,
      store,
      render: h => h(App),
  }).$mount('#SubAppContainer');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main app', props);
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}