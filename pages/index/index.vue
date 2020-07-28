<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 背景图片 -->
		<image class="u-f-ajc"
		:style="'height: ' + screenHeight + 'px!important;'"
		src="../../static/images/index/index.png"
		mode="scaleToFill"
		lazy-load/>
		<!-- 欢迎文字、提示文字 -->
		<view class="index-welcome u-f-ajc">Welcome!</view>
		<!-- <view class="index-tips u-f-ajc">欢迎使用校友app，请选择登录账号或注册账号。</view> -->
		<!-- 按钮部分 -->
		<button class="index-btn index-btn-login" type="default" @tap="toLogin">登录</button>
		<button class="index-btn index-btn-reg" type="default" @tap="toRegister">注册</button>
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
			// 跳转至登录页
			toLogin() {
				uni.navigateTo({
					url: '../login/login'
				});
			},
			// 跳转至注册页
			toRegister() {
				uni.navigateTo({
					url: '../register/register'
				});
			}
		},
		onLoad() {
			// 获取屏幕高度
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style>
	.outer {
		position: relative;
	}
	
	image {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 750rpx;  /* 750rpx代表屏幕宽度 */
	}
	
	.index-welcome {
		color: #e6e3e3;
		font-size: 125rpx;
		padding-top: 60rpx;
	}
	
	.index-tips {
		color: #fff;
		font-size: 25rpx;
		padding-top: calc(75%);
	}
	
	.index-btn {
		position: absolute;
		left: 155rpx;
		width: 440rpx;
		border-radius: 100rpx;
		color: #00a0eb!important;
		font-size: 36rpx;
	}
	
	.index-btn-login {
		bottom: 240rpx;
	}
	
	.index-btn-reg {
		bottom: 100rpx;
	}
</style>
