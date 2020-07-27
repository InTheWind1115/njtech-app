<template>
	<view id="reg-suc">
		<h2>注册成功</h2>
		<image src="../../static/images/register/reg_succ.png" mode=""></image>
		<view class="enter">
			进入校友
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	#reg-suc {
		position: relative;
	}
	
	#reg-suc h2 {
		font-weight: 400;
		margin-top: 80rpx;
		text-align: center;
		color: #515253;
	}
	
	#reg-suc image {
		position: absolute;
		width: 250rpx;
		height: 250rpx;
		left: 50%;
		margin-left: -125rpx;
		margin-top: 40rpx;
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
