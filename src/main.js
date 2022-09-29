import Vue from 'vue';
import App from './App';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.mixin({
  methods: {
    async $request(path, data, method = 'GET') {
      const response = await fetch(`http://localhost/${path}`, {
        method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      return await response.json();
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
