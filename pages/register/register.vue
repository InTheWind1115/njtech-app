<!-- 注册 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 导航栏 -->
		<navbar-easy text="注册"></navbar-easy>

		<!-- 注册信息 start -->
		<view id="regInfo">
			<view id="name">
				<view class="inlineBlock regFont">
					姓名：
				</view>

				<input class='inlineBlock regInput' type="text" v-model="name" value="test" />
			</view>
			<view id="id">
				<view class="inlineBlock regFont">
					学号：
				</view>
				<input class='inlineBlock regInput' type="number" v-model="sid" />
			</view>
			<view id="psw">
				<view class="inlineBlock regFont">
					新密码：
				</view>

				<input class='inlineBlock regInput' type="text" password="true" v-model="psw" />
			</view>
			<view id="confirm">
				<view class="inlineBlock regFont">
					确认密码：
				</view>

				<input class='inlineBlock regInput' type="text" password="true" v-model="psw_conf" />
			</view>
			<view id="phoneNum">
				<view class="inlineBlock regFont">
					手机号：
				</view>

				<input class='inlineBlock regInput' type="number" v-model="phonenum" />
			</view>
			<view id="graphCode">
				<view class="inlineBlock regFont">
					图形验证码：
				</view>

				<input class='inlineBlock regInput' type="text" v-model="picnum" />
				
				<image id="codeimg" class="inlineBlock" :src="imgurl" mode="aspectFit" lazy-load @tap="codeimgChange"></image>
			</view>
			<view id="messCode">
				<view class="inlineBlock regFont">
					短信验证码：
				</view>

				<input class='inlineBlock regInput' type="text" v-model="textnum" />
				<view id="getCode" class="inlineBlock" @tap="getPhoneCode" :class="{'getCodeSelected' : getCodeSelected}">
					{{message}}
				</view>
			</view>
		</view>
		<!-- 注册信息 end -->

		<view id="agreement">
			<text>注册即表示同意</text>
			<text style="color: #00a0eb;" @tap="navToAgreement">《校友APP用户协议》</text>
		</view>

		<button class="next-default" hover-class="next-selected" hover-start-time="0" :class="{'next-disabled': disabled}"
		 :loading="loading" :disabled="disabled" @tap="regSubmit">
			下一步
		</button>

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
				baseUrl: 'http://202.119.245.23/api-dev/v3',
				url: {
					regCheckImgCode: '/reg/checkVerificationCode',
					regGetImgCode: '/reg/defaultKaptcha',
					regRegister: '/reg/register',
					regGetPhoneCode: '/sendSms/send'  // 可能需要与手机号有关：/sendSms/send/{phoneNumber}
				},
				
				getCodeSelected: true,
				message: "获取验证码",
				codeFlag: false, //判断能否获取验证码
				count: 59, //用来倒计时，当获取一次验证码，60s后可获取第二次
				button: null,

				// 表单与按钮部分
				name: "",
				sid: "",
				psw: "",
				psw_conf: "",
				phonenum: "",
				picnum: "",
				textnum: "",
				disabled: true,
				loading: false,
				imgurl: '',
				
				// 手机信息（尺寸）
				screenHeight: ''  // 屏幕高度（单位px）
			}
		},
		watch: {
			name(val) {
				this.buttonChange();
			},
			sid(val) {
				this.buttonChange();
			},
			psw(val) {
				this.buttonChange();
			},
			psw_conf(val) {
				this.buttonChange();
			},
			phonenum(val) {
				this.buttonChange();
				// 如果没有开始倒计时，进行手机号规范性检验
				var re = new RegExp(/^1\d{10}$/);
				if (this.count === 59) {
					if (!re.test(this.phonenum)) {
						this.codeFlag = false;
						this.getCodeSelected = true;
						return;
					}
					this.codeFlag = true;
					this.getCodeSelected = false;
				}
			},
			picnum(val) {
				this.buttonChange();
			},
			textnum(val) {
				this.buttonChange();
			}
		},
		methods: {
			getPhoneCode() {
				if (this.codeFlag) {
					this.getCodeSelected = true
					this.message = '60s...'
					this.codeFlag = false
					// 倒计时模块
					let timeCount = setInterval(() => {
						this.message = this.count + 's...'
						this.count--
						if (this.count == -1) {
							this.count = 59
							this.codeFlag = true
							this.message = '获取验证码'
							this.getCodeSelected = false
							clearInterval(timeCount)
						}
					}, 1000)
					
					// 发送验证码
					var that = this;
					var phoneNumber = that.phonenum;
					uni.request({
						url: that.baseUrl + that.url.regGetPhoneCode + '/' + phoneNumber,
						method: 'GET',
						data: {
							phoneNumber: phoneNumber
						},
						success: res => {
							console.log(res.data);  // 观察验证码
							if (res.data.success) {
								uni.showToast({
									title: '验证码' + new RegExp(/.*\d(.*)/).exec(res.data.message)[1],  // 根据后端数据改写
									icon: 'none'
								});
							} else {
								uni.showToast({
									title: '请求失败',
									icon: 'none'
								});
								this.getCodeSelected = false;
								this.message = '获取验证码';
								this.codeFlag = true;
							}
						}
					});

				}
				// this.getCodeSelected = true
				// if (this.codeFlag) {
				// 	this.button.style.backgroundColor = '#B3E2F9'
				// 	this.button.innerText = '60s...'
				// 	this.codeFlag = false
				// 	let timeCount = setInterval(() => {
				// 		this.button.innerText = this.count + 's...'
				// 		this.count--
				// 		if (this.count == -1) {
				// 			this.count = 59
				// 			this.codeFlag = true
				// 			this.button.innerText = '获取验证码'
				// 			this.button.style.backgroundColor = '#00a0eb'
				// 			clearInterval(timeCount)
				// 		}
				// 	}, 1000)
				// }
			},
			// 验证码切换
			codeimgChange() {
				this.imgurl = this.baseUrl + this.url.regGetImgCode + '?_t=' + new Date().getTime();
			},
			// 页面跳转
			navToAgreement() {
				uni.navigateTo({
					url: '../agreement/agreement'
				});
			},
			// 表单初始化
			formInit() {
				this.name = "";
				this.sid = "";
				this.psw = "";
				this.psw_conf = "";
				this.phonenum = "";
				this.picnum = "";
				this.textnum = "";
			},
			// 输入框变化后处理
			buttonChange() {
				if (this.name && this.sid && this.psw && this.psw_conf && this.phonenum && this.picnum && this.textnum) {
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			// 验证输入是否规范
			regCheck() {
				// 非空检验（按钮被disabled，理论上可以不用检验）
				if (!this.name || this.name === "") {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.sid || this.sid === "") {
					uni.showToast({
						title: '学号不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.psw || this.psw === "") {
					uni.showToast({
						title: '新密码不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.psw_conf || this.psw_conf === "") {
					uni.showToast({
						title: '确认密码不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.phonenum || this.phonenum === "") {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.picnum || this.picnum === "") {
					uni.showToast({
						title: '图形验证码不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.textnum || this.textnum === "") {
					uni.showToast({
						title: '短信验证码不能为空',
						icon: 'none'
					});
					return false;
				}
				// 两次密码一致性检验
				if (this.psw !== this.psw_conf) {
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none'
					});
					return false;
				}
				// 手机号规范性检验
				var re = new RegExp(/^1\d{10}$/);
				if (!re.test(this.phonenum)) {
					uni.showToast({
						title: '请输入正确的11位手机号',
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			// 注册信息提交
			regSubmit() {
				var that = this;
				var succ = false; // 标记登录是否成功

				that.loading = true; // 正在加载
				that.disabled = true; // 不能点击

				// 格式有误（regCheck中会进行相应格式提示）
				if (!this.regCheck()) {
					that.loading = false; // 加载完毕
					that.disabled = false; // 可以点击
					return;
				}
				
				// 上传数据
				var password = that.psw;
				var realName = that.name;
				var smsCode = that.textnum;
				var studentId = that.sid;
				var telephone = that.phonenum;
				var verificationCode = that.picnum;
				uni.request({
					url: that.baseUrl + that.url.regRegister,
					method: 'POST',
					data: {
						password: password,
						realName: realName,
						smsCode: smsCode,
						studentId: studentId,
						telephone: telephone,
						verificationCode: verificationCode
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						console.log(res.data);
						if (res.data.success) {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
							that.picnum = '';
							that.codeimgChange();
							that.loading = false; // 加载完毕
							that.disabled = true; // 不能点击
							if (res.data.result !== 0) {  // 注册成功
								uni.redirectTo({
									url: '../register_succ/register_succ'
								});
							}
						} else {
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							});
						}
					}
				});
				
			}
		},
		onLoad() {
			// 获取屏幕高度
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			// 获取一张初始的图片验证码
			this.codeimgChange();
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
		font-size: 30rpx !important;
		line-height: 80rpx;
		color: #5b5c5d;
	}

	.regInput {
		position: absolute;
		border: 0rpx;
		height: 30rpx;
		top: 50%;
		margin-top: -22rpx;
		font-size: 30rpx;
	}

	#getCode {
		position: absolute;
		background-color: #00a0eb;
		height: 40rpx;
		width: 160rpx;
		top: 50%;
		right: 30rpx;
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

	.next-default {
		width: 600rpx;
		height: 100rpx;
		background-color: #00A0EB !important;
		padding: 20px auto;
		border-radius: 50rpx;
		color: #FFFFFF !important;
		font-weight: 700;
		font-size: 20rpx;
		text-align: center;
		font-size: 50rpx;
		line-height: 100rpx;
	}

	.next-disabled {
		background-color: #B3E2F9 !important;
	}

	.next-selected {
		background-color: #0081BD !important;
	}

	.getCodeSelected {
		background-color: #B3E2F9 !important;
	}
	
	#codeimg {
		position: absolute;
		width: 160rpx;
		height: 60rpx;
		top: 50%;
		right: 30rpx;
		margin-top: -30rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>
