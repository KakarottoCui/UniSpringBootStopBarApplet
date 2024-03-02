import Vue from 'vue'
import App from './App'

// vuex
import store from './store'

// 引入全局uView
import uView from "uview-ui";//引入uView UI
Vue.use(uView);

import mixin from './common/mixin'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

Vue.mixin(mixin)

const app = new Vue({
    store,
    ...App
})

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.prototype.$api = {msg};

// 引入请求封装
require('./util/request/index')(app)

app.$mount()
