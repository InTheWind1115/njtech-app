<!-- 忘记密码 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<navbar-easy text="找回密码"></navbar-easy>
	</view>
</template>

<script>
	import navbarEasy from "../../components/common/navbar-easy.vue";
	
	export default {
		// 注册组件
		components: {
			navbarEasy
		},
		data() {
			return {
				
				
				// 屏幕尺寸
				screenWidth: 0,
				screenHeight: 0
			}
		},
		methods: {
		},
		onShow() {
			// 获取屏幕尺寸
			this.screenWidth = uni.getSystemInfoSync().windowWidth
			this.screenHeight = uni.getSystemInfoSync().windowHeight
		}
	}
</script>

<style>

</style>
