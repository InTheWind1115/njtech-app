<!-- 搜索我的好友 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		
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
		}
	}
</script>

<style>

</style>
