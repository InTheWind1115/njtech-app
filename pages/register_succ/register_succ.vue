<!-- 注册成功 -->
<template>
	<view id="reg-suc" :style="'height: ' + screenHeight + 'px'">
		<h2>注册成功</h2>
		<image src="../../static/images/register/reg_succ.png" mode="" lazy-load></image>
		<view class="enter" @tap="redToPersonalCenter">
			进入校友
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: ''  // 屏幕高度（单位px）
			}
		},
		methods: {
			redToPersonalCenter() {
				uni.redirectTo({
					url: '../personal_center/personal_center'
				});
			},
		},
		onLoad() {
			// 获取屏幕高度
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style scoped>
	#reg-suc {
		position: relative;
		width: 750rpx;
	}
	
	#reg-suc h2 {
		font-weight: 400;
		padding-top: 80rpx;
		text-align: center;
		color: #515253;
	}
	
	#reg-suc image {
		position: absolute;
		width: 250rpx;
		height: 250rpx;
		left: 50%;
		margin-left: -125rpx;
		padding-top: 40rpx;
	}
	
	.enter {
		position: absolute;
		width: 80%;
		height: 100rpx;
		left: 50%;
		margin-top: 690rpx;
		margin-left: -40%;
		background: rgba(0,160,235,1);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		font-weight: 500;
	}
</style>
