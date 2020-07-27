import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		windowWidth: 0,
		windowHeight: 0
	},
	mutations: {
		setWidth(state, width) {
			// console.log(width + '@@@@@@@@@');
			state.windowWidth = width
		},
		setHeight(state, height) {
			state.windowHeight = height
		}
	}
})

export default store
