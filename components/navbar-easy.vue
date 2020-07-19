<template>
	<view>
		<view class="nav">
			<view class="nav-btn-default icon iconfont icon-fanhui"
			hover-start-time="0"
			hover-stay-time="0"
			@tap="back"></view>
			<view class="nav-text u-f-ajc">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: String
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped>
	.nav {
		position: relative;
		
	}
	
	.nav-btn-default {
		position: absolute;
		left: 30rpx;
		top: 40rpx;
		font-size: 50rpx;
		color: #00A0EB;
	}
	
/* 	.nav-btn-selected {
		position: absolute;
		left: 30rpx;
		top: 40rpx;
		font-size: 50rpx;
		color: #00A0EB;
	} */
	
	.nav-text {
		font-size: 50rpx;
		padding-top: 40rpx;
	}
</style>
