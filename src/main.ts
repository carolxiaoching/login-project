import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTw from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

configure({
  generateMessage: localize({
    zh_TW: zhTw,
  }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
