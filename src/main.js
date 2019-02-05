import Vue from 'vue'
import App from './App.vue'

var portalHold = document.createElement('div');
portalHold.id = "portal-container";
document.querySelector('body').appendChild(portalHold);

new Vue({
  el: '#backlog_app',
  render: h => h(App)
})
