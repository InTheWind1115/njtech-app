<!-- 学籍认证 -->
<template>
	<view :style="'height: ' + screenHeight + 'px'">
		<!-- 导航栏，估计高度100rpx -->
		<navbar-easy class="cert-nav" text="学籍认证"></navbar-easy>
		<!-- 表单部分 -->
		<view class="cert-form u-f-aj" :style="'height: ' + (screenHeight - rpx2px(240)) + 'px'">
			<view class="cert-form-content">
				<view class="cert-form-in-group">
					<view class="cert-form-in-text">姓名：</view>
					<input class="cert-form-in" v-model="name" type="text"/>
				</view>
				<view class="cert-form-in-group">
					<view class="cert-form-in-text">院系：</view>
					<uni-combox class="cert-form-in" :candidates="collegeCand" v-model="college" :emptyTips="collegeEmpty"></uni-combox>
				</view>
				<view class="cert-form-in-group">
					<view class="cert-form-in-text">专业：</view>
					<uni-combox class="cert-form-in" :candidates="majorCand" v-model="major" :emptyTips="majorEmpty"></uni-combox>
				</view>
				<view class="cert-form-in-group">
					<view class="cert-form-in-text">班级：</view>
					<uni-combox class="cert-form-in" :candidates="clazzCand" v-model="clazz" :emptyTips="clazzEmpty"></uni-combox>
				</view>
				<view class="cert-form-in-group">
					<view class="cert-form-in-text">学号：</view>
					<input class="cert-form-in" v-model="sno" type="number"/>
				</view>
			</view>
			
			<button class="cert-form-btn-dafault u-f-ajc"
			type="default"
			:class="{'cert-form-btn-disabled': disabled}"
			:loading="loading"
			:disabled="disabled"
			@tap="submitCert">提交认证</button>
		</view>
	</view>
</template>

<script>
	import navbarEasy from "../../components/common/navbar-easy.vue";
	import uniCombox from "@/components/uni-combox/uni-combox";
	
	export default {
		// 注册组件
		components: {
			navbarEasy
		},
		data() {
			return {
				// 按钮阻止
				disabled: true,
				loading: false,
				
				// 表单数据
				name: '',
				college: '',
				major: '',
				clazz: '',
				sno: '',
				
				// 候选字段
				collegeCand: [
					'安全科学与工程学院',
					'环境科学与工程学院',
					'材料科学与工程学院',
					'化工学院',
					'化学与分子工程学院',
					'电气工程与控制科学学院',
					'机械与动力工程学院',
					'能源科学与工程学院',
					'药学院',
					'建筑学院',
					'艺术设计学院',
					'经济与管理学院',
					'法学院',
					'外国语言文学学院',
					'生物与制药工程学院',
					'食品与轻工学院',
					'计算机科学与技术学院',
					'数理科学学院',
					'测绘科学与技术学院',
					'城市建设学院',
					'交通运输工程学院',
					'土木工程学院'
				],
				majorCand: [
				],
				clazzCand: [
				],
				collegeEmpty: '请选择列表中给定的选项',
				majorEmpty: '请先选择院系',
				clazzEmpty: '请先选择专业',
				
				// 屏幕尺寸
				screenWidth: 0,
				screenHeight: 0
			}
		},
		watch: {
			name(val) {
				this.buttonChange();
			},
			college(val) {
				// 如果选择了学院列表中的某一项，则去请求该学院的专业信息加入数组，并调整空查找提示
				if (this.collegeCand.indexOf(val) > -1) {
					this.majorCand = [
						'模拟请求获取到的专业1',
						'模拟请求获取到的专业2',
						'模拟请求获取到的专业3',
						'模拟请求获取到的专业4'
					];
					this.majorEmpty = "无匹配项";
				} else {
					this.majorCand = [];
					this.clazzCand = [];
					this.majorEmpty = "请先选择院系";
				}
				this.buttonChange();
			},
			major(val) {
				// 如果选择了专业列表中的某一项，则去请求该学院的专业信息加入数组，并调整空查找提示
				if (this.majorCand.indexOf(val) > -1) {
					this.clazzCand = [
						'模拟请求获取到的班级1',
						'模拟请求获取到的班级2',
						'模拟请求获取到的班级3',
						'模拟请求获取到的班级4'
					];
					this.clazzEmpty = "无匹配项";
					
				} else {
					this.clazzCand = [];
					this.clazzEmpty = "请先选择专业";
				}
				this.buttonChange();
			},
			clazz(val) {
				this.buttonChange();
			},
			sno(val) {
				this.buttonChange();
			}
		},
		methods: {
			// 工具函数
			rpx2px(width) {
				return this.screenWidth / 750 * width;
			},
			// 按钮阻止模块
			buttonChange() {
				// 不能有空
				if (!(this.name && this.college && this.major && this.clazz && this.sno)) {
					this.disabled = true;
					return;
				}
				this.disabled = false;
			},
			// 表单相关函数
			formInit() {
				this.name = '';
				this.college = '';
				this.major = '';
				this.clazz = '';
				this.sno = '';
			},
			formCheck() {
				// 填写内容必须在下拉候选栏中
				if (!(this.collegeCand.indexOf(this.college) > -1
						&& this.majorCand.indexOf(this.major) > -1
						&& this.clazzCand.indexOf(this.clazz) > -1)) {
					uni.showToast({
						title: '下拉栏填写内容必须在列表内',
						icon: 'none'
					});
					this.college = '';
					this.major = '';
					this.clazz = '';
					return false;
				}
				return true;
			},
			submitCert() {
				var that = this;
				
				that.loading = true;  // 正在加载
				that.disabled = true;  // 不能点击
				
				// 格式有误（loginCheck中会进行相应格式提示）
				if (!that.formCheck()) {
					that.loading = false;  // 加载完毕
					that.disabled = false;  // 可以点击
					return;
				}
				
				// 逻辑验证、数据互通
				// （待完善）
				// （待完善）
				// （待完善）
				
				setTimeout(() => {
					that.formInit();
					that.loading = false;  // 加载完毕
					that.disabled = true;  // 不能点击
				}, 2000);
			}
		},
		onShow() {
			this.screenWidth = uni.getSystemInfoSync().windowWidth;
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style>
	/* 导航栏（底边线） */
	.cert-nav {
		border-bottom: 1rpx solid #D8D8D8;
	}
	
	
	/* 表单部分 */
	.cert-form {
		border: 5rpx solid #00A0EB;
		border-radius: 31rpx;
		margin: 16rpx 18rpx 0 18rpx;
	}
	.cert-form-btn-dafault {
		position: absolute;
		bottom: 185rpx;
		width: 456rpx;
		height: 100rpx;
		border-radius: 200rpx;
		background-color: #FF9600!important;
		color: #FFFFFF!important;
		font-weight: 600;
		font-size: 35rpx;
	}
	.cert-form-btn-disabled {
		background-color: #FFD79B!important;
	}
	.cert-form-content {
		padding-top: 35rpx;
	}
	.cert-form-in-group {
		position: relative;
	}
	.cert-form-in-text {
		position: absolute;
		left: 33rpx;
		top: 20rpx;
		font-size: 35rpx;
		color: #4C4D4E;
	}
	.cert-form-in {
		background-color: #F4F4F4;
		border-radius: 300rpx;
		width: 542rpx;
		height: 104rpx;
		margin-bottom: 44rpx;
		padding-left: 138rpx;
	}
	.uni-combox {
		height: 104rpx!important;
	}
</style>
