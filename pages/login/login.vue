<template>
	<view>
		<!-- 导航栏 -->
		<navbar-easy text="登录"></navbar-easy>
		<!-- 表单部分 -->
		<form class="u-f-ajc"
		@submit="loginSubmit">
			<view class="login-form">
				<view class="login-input-group">
					<view class="login-input-icon icon iconfont icon-yonghu"></view>
					<input class="login-input login-input-user u-f-ajc"
					type="number"
					v-model="user"
					placeholder="学号/手机号"
					placeholder-class="login-input-placeholder"/>
				</view>
				<view class="login-input-group">
					<view class="login-input-icon icon iconfont icon-224yonghu_mima_yuechi4"></view>
					<input class="login-input login-input-psw u-f-ajc"
					type="text"
					v-model="psw"
					password="true"
					placeholder="密码"
					placeholder-class="login-input-placeholder"/>
				</view>
				<view class="login-forget"
				@tap="toForget">忘记密码</view>
				<button class="login-btn-submit-default"
				hover-class="login-btn-submit-selected"
				hover-start-time="0"
				form-type="submit"
				:class="{'login-btn-submit-disabled': disabled}"
				:loading="loading"
				:disabled="disabled">登录</button>
			</view>
		</form>
		<!-- 注册页跳转按钮 -->
		<button class="login-btn-register-default"
		hover-class="login-btn-register-selected"
		@tap="toRegister">注册</button>
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
				user: '',
				psw: '',
				disabled: true,
				loading: false
			}
		},
		watch: {
			user(val) {
				this.buttonChange()
			},
			psw(val) {
				this.buttonChange()
			}
		},
		methods: {
			// 页面跳转
			toForget() {
				uni.navigateTo({
					url: '../forget/forget'
				});
			},
			toRegister() {
				uni.navigateTo({
					url: '../register/register'
				});
			},
			// 表单初始化
			formInit() {
				this.user = '';
				this.psw = '';
			},
			// 输入框变化后处理
			buttonChange() {
				if (this.user && this.psw) {
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			// 验证
			loginCheck() {
				if (!this.user || this.user==="")  {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.psw || this.psw==="")  {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			// 表单提交
			loginSubmit() {
				var that = this;
				var succ = false;  // 标记登录是否成功
				
				that.loading = true;  // 正在加载
				that.disabled = true;  // 不能点击
				
				// 格式有误（loginCheck中会进行相应格式提示）
				if (!this.loginCheck()) {
					that.loading = false;  // 加载完毕
					that.disabled = false;  // 可以点击
					return;
				}
				
				// 逻辑验证
				//     主要包括：用户名存在性检查、密码正确性检查
				// ...（待完善）
			},
		}
	}
</script>

<style>
	/* 输入框样式部分 */
	.login-input {
		width: 500rpx;
		height: 100rpx;
		padding: 0 80rpx;
		margin-bottom: 50rpx;
		border-radius: 100rpx;
		background-color: #F9F9F9;
		font-size: 32rpx;
		line-height: 100rpx;
	}
	.login-form>view:first-child{  /* 类名为.login-form的标签下的第一个view需要更多margin-top */
		margin-top: 200rpx;
	}
	.login-input-placeholder {  /* 某些输入框的placeholder样式 */
		color: #999B9C;
	}
	
	/* 输入框图标样式 */
	.login-input-group {
		position: relative;
	}
	.login-input-icon {
		position: absolute;
		left: 30rpx;
		top: 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #00A0EB;
	}
	
	/* 链接样式 */
	.login-forget {
		font-size: 24rpx;
		color: #00A0EB;
		margin-left: calc(95% - 4 * 24rpx);
	}
	
	/* 按钮样式 */
	.login-btn-submit-default {
		margin-top: 200rpx;
		background-color: #00A0EB;
		color: #FFF;
		border-radius: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 36rpx;
	}
	.login-btn-submit-selected {
		background-color: #0081BD;
	}
	.login-btn-submit-disabled {
		background-color: #B3E2F9!important;
		color: #FFF!important;
	}
	.login-btn-register-default {
		width: 165rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 200rpx;
		color: #00A0EB;
		border: 1rpx solid #00A0EB;
		background-color: #FFF;
	}
	.login-btn-register-selected {
		background-color: #F8F8F8;
	}
</style>
