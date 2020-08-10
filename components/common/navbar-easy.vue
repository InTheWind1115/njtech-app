<template>
	<view>
		<view class="nav">
			<!-- 图标返回按钮 -->
<!-- 			<view class="nav-btn-default icon iconfont icon-fanhui"
			hover-start-time="0"
			hover-stay-time="0"
			@tap="back"></view> -->
			
			<!-- 文字返回按钮 -->
			<button class="nav-btn-default"
			type="default"
			@tap="back">
				返回
			</button>
			
			<!-- 导航栏标题文字 -->
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
		top: 68rpx;
		font-size: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 100rpx;
		border: 1rpx solid #00A0EB;
		color: #00A0EB;
		background-color: #FFFFFF;
	}
	
	.nav-text {
		font-size: 50rpx;
		padding-top: 40rpx;
	}
</style>
