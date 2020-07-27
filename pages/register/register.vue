<template>
	<view :style="">
		
		<!-- 导航栏 -->
		<navbar-easy text="注册"></navbar-easy>
		
		<!-- 注册信息 start -->
		<view id="regInfo" :style="" >
			<view id="name">
				<view class="inlineBlock regFont">
					姓名：
				</view>
				
				<input class='inlineBlock regInput' type="text" />
			</view>
			<view id="id">
				<view class="inlineBlock regFont">
					学号：
				</view>
				<input class='inlineBlock regInput' type="number" />
			</view>
			<view id="psw">
				<view class="inlineBlock regFont">
					新密码：
				</view>
				
				<input class='inlineBlock regInput' type="text" password="true" />
			</view>
			<view id="confirm">
				<view class="inlineBlock regFont">
					确认密码：
				</view>
				
				<input class='inlineBlock regInput' type="text" password="true" />
			</view>
			<view id="phoneNum">
				<view class="inlineBlock regFont">
					手机号：
				</view>
				
				<input class='inlineBlock regInput' type="number"  />
			</view>
			<view id="graphCode">
				<view class="inlineBlock regFont">
					图形验证码：
				</view>
				
				<input class='inlineBlock regInput' type="text" />
			</view>
			<view id="messCode">
				<view class="inlineBlock regFont">
					短信验证码：
				</view>
				
				<input class='inlineBlock regInput' type="text"  />
				<view id="getCode" class="inlineBlock" @click="getPhoneCode">获取验证码</view>
			</view>
		</view>
		<!-- 注册信息 end -->
		
		<view id="agreement">
			<text>注册即表示同意</text>
			<text style="color: #00a0eb;">《校友APP用户协议》</text>
		</view>
		
		<view id="next">
			下一步
		</view>
		
	</view>
</template>


<script>
	import navbarEasy from "../../components/navbar-easy.vue";
	
	export default {
		// 注册组件
		components: {
			navbarEasy
		},
		data() {
			return {
				codeFlag: true,//判断能否获取验证码
				count: 59 ,//用来倒计时，当获取一次验证码，60s后可获取第二次
				button: null
			}
		},
		onReady() {
			this.button = uni.createSelectorQuery().in(this).select('#getCode')
			// console.log('#####')
			// console.log(this.button + '@@@@@@')
		},
		methods: {
			getPhoneCode() {
				if (this.codeFlag) {
					this.button.style.backgroundColor = '#B3E2F9'
					this.button.innerText = '60s...'
					this.codeFlag = false
					let timeCount = setInterval(() => {
						this.button.innerText = this.count + 's...'
						this.count--
						if (this.count == -1) {
							this.count = 59
							this.codeFlag = true
							this.button.innerText = '获取验证码'
							this.button.style.backgroundColor = '#00a0eb'
							clearInterval(timeCount)
						}
					}, 1000)
				}
			}
		},
		onShow() {
		}
	}
</script>

<style>
	.inlineBlock {
		display: inline-block;
	}
	
	#name,
	#id,
	#psw,
	#confirm,
	#phoneNum,
	#graphCode,
	#messCode {
		position: relative;
		width: 650rpx;
		height: 80rpx;
		background-color: #f9f9f9;
		margin: 30rpx auto;
		border-radius: 40rpx;
	}
	
	.regFont {
		padding-left: 30rpx;
		font-size: 30rpx!important;
		line-height: 80rpx;
		color: #5b5c5d;
	}
	
	.regInput {
		position: absolute;
		border: 0rpx;
		height: 30rpx;
		top: 50%;
		margin-top: -22rpx;
	}
	
	#getCode {
		position: absolute;
		background-color: #00a0eb;
		height: 40rpx;
		width: 160rpx;
		top: 50%;
		right: 20rpx;
		margin-top: -20rpx;
		border-radius: 20rpx;
		font-size: 25rpx;
		text-align: center;
		line-height: 40rpx;
		color: #ffffff;
		font-weight: 700;
	}
	
	#agreement {
		width: 650rpx;
		height: 80rpx;
		margin: 10rpx auto;
		font-weight: 700;
		font-size: 20rpx;
	}
	
	#next {
		width: 600rpx;
		height: 100rpx;
		background-color: #b3e2f9;
		margin: 20px auto;
		border-radius: 50rpx;
		color: #FFFFFF;
		font-weight: 700;
		font-size: 20rpx;
		text-align: center;
		font-size: 50rpx;
		line-height: 100rpx;
	}
	
	
</style>
