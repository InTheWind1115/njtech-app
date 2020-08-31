<!-- 添加好友详情 -->
<template>
	<view>
		
	</view>
</template>

<script>
	export default {
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
		},
		onLoad(option) {
			console.log(option.uid)
		}
	}
</script>

<style>

</style>
