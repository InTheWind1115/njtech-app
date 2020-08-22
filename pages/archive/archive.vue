<!-- 个人档案 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="archive-nav u-f-jsb u-f-ac">
			<template v-if="disabled">
				<view class="archive-nav-btn archive-nav-btn-l" @tap="edit">编辑</view>
			</template>
			<template v-else>
				<view class="archive-nav-placeholder"></view>
			</template>
			
			<view class="archive-nav-title">个人档案</view>
			
			<view class="archive-nav-btn archive-nav-btn-r" @tap="submit">保存</view>
		</view>
		<!-- 表单 -->
		<view class="archive-form">
			<view class="archive-input-group">
				<view class="archive-input-tips">学号：</view>
				<input class="archive-input-2 archive-input-short"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="number"
				v-model="sid" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">姓名：</view>
				<input class="archive-input-2 archive-input-short"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="name" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">性别：</view>
				<input class="archive-input-2 archive-input-short"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="gender" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">民族：</view>
				<input class="archive-input-2"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="nation" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">籍贯：</view>
				<input class="archive-input-2"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="nativePlace" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">学院：</view>
				<input class="archive-input-2"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="college" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">专业：</view>
				<input class="archive-input-2"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="major" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">学制：</view>
				<input class="archive-input-2"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="eduSystme" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">入学年月：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="schoolYears" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">毕业年月：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="graduateYears" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">学生类别：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="stype" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">政治面貌：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="politicalStatus" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">所在校区：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="campus" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">是否在职：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="isOnTheJob" />
			</view>
			<view class="archive-input-group">
				<view class="archive-input-tips">研究方向：</view>
				<input class="archive-input-4"
				:class="{'archive-input-disabled': disabled}"
				:disabled="disabled"
				type="text"
				v-model="researchDirection" />
			</view>
			<image class="archive-img"
			:src="imgurl"
			mode="aspectFill"
			lazy-load
			@tap="chooseImage"></image>
		</view>
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	
	export default {
		data() {
			return {
				// 编辑状态
				disabled: true,
				
				// 上传图片组件
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 0,
				count: [1],
				
				// 表单数据
				sid: '',
				name: '',
				gender: '',
				nation: '',
				nativePlace: '',
				college: '',
				major: '',
				eduSystme: '',
				schoolYears: '',
				graduateYears: '',
				stype: '',
				politicalStatus: '',
				campus: '',
				isOnTheJob: '',
				researchDirection: '',
				imgurl: '',
				
				formBefore: {
					sid: '',
					name: '',
					gender: '',
					nation: '',
					nativePlace: '',
					college: '',
					major: '',
					eduSystme: '',
					schoolYears: '',
					graduateYears: '',
					stype: '',
					politicalStatus: '',
					campus: '',
					isOnTheJob: '',
					researchDirection: '',
					imgurl: ''
				},
				
				// 返回事件相关标记
				backPressed: false,
				
				// 屏幕尺寸
				screenWidth: 0,
				screenHeight: 0
			}
		},
		methods: {
			// 导航栏按钮相关函数
			edit() {
				this.disabled = false
			},
			submit() {
				this.disabled = true
				if (!this.isSame()) {
					this.saveLocalPoint()
					this.saveCloudData()
				}
			},
			// 数据读写相关函数
			getInit() {
				// 读取用户数据
				/// （待完善，此处仅模拟）
				this.name = '以下内容仅为模拟'
				this.gender = '女'
				this.nation = '汉'
				this.nativePlace = '江苏南京'
				this.college = '计算机科学与技术学院'
				this.major = '计算机科学与技术'
				this.eduSystme = "4年制"
				this.schoolYears = "2020年8月22日"
				this.graduateYears = "2020年8月22日"
				this.stype = "本科生"
				this.politicalStatus = "共青团员"
				this.campus = "江浦校区"
				this.isOnTheJob = "否"
				this.researchDirection = "无"
				this.imgurl = "../../static/images/archive/archive_img-default.png"
				this.saveLocalPoint()
			},
			saveCloudData() {
				// 本地数据上传云端
				/// （待完善）
				uni.showToast({
					title: '模拟上传云端',
					icon: 'none'
				});
			},
			saveLocalPoint() {
				this.formBefore.sid = this.sid
				this.formBefore.name = this.name
				this.formBefore.gender = this.gender
				this.formBefore.nation = this.nation
				this.formBefore.nativePlace = this.nativePlace
				this.formBefore.college = this.college
				this.formBefore.major = this.major
				this.formBefore.eduSystme = this.eduSystme
				this.formBefore.schoolYears = this.schoolYears
				this.formBefore.graduateYears = this.graduateYears
				this.formBefore.stype = this.stype
				this.formBefore.politicalStatus = this.politicalStatus
				this.formBefore.campus = this.campus
				this.formBefore.isOnTheJob = this.isOnTheJob
				this.formBefore.researchDirection = this.researchDirection
				this.formBefore.imgurl = this.imgurl
			},
			// 校检函数
			isSame() {
				if(
					this.formBefore.sid === this.sid &&
					this.formBefore.name === this.name &&
					this.formBefore.gender === this.gender &&
					this.formBefore.nation === this.nation &&
					this.formBefore.nativePlace === this.nativePlace &&
					this.formBefore.college === this.college &&
					this.formBefore.major === this.major &&
					this.formBefore.eduSystme === this.eduSystme &&
					this.formBefore.schoolYears === this.schoolYears &&
					this.formBefore.graduateYears === this.graduateYears &&
					this.formBefore.stype === this.stype &&
					this.formBefore.politicalStatus === this.politicalStatus &&
					this.formBefore.campus === this.campus &&
					this.formBefore.isOnTheJob === this.isOnTheJob &&
					this.formBefore.researchDirection === this.researchDirection &&
					this.formBefore.imgurl === this.imgurl
				)
					return true;
				return false;
			},
			// 上传图片组件
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: (res) => {
						this.imageList = [];
						this.imageList = this.imageList.concat(res.tempFilePaths);
						this.imgurl = this.imageList[0];
						// 将新头像上传云端
						/// （待完善）
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'njtech-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			}
		},
		onShow() {
			// 获取屏幕尺寸
			this.screenWidth = uni.getSystemInfoSync().windowWidth
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			
			// 初始化数据
			this.getInit()
		},
		onBackPress(opt) {
			// 本地数据变化
			if (this.isSame()) {
				return
			}
			
			if (!this.backPressed) {
				uni.showModal({
					content: "是否保存更改？",
					cancelText: "不保存",
					confirmText: "保存",
					success: (res) => {
						if (res.confirm) {
							this.submit()
							this.backPressed = true;
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						} else {
							this.backPressed = true;
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				return true
			}
		}
	}
</script>

<style>
	/* 导航栏部分 */
	.archive-nav{
		position: fixed;
		width: 750rpx;
		height: 100rpx;
		z-index: 1;
		padding-top: 40rpx;
		background-color: #F3F3F3;
	}
	.archive-nav-title {
		font-size: 48rpx;
	}
	.archive-nav-btn {
		font-size: 32rpx;
		color: #7C7B7B;
		font-weight: 600;
	}
	.archive-nav-btn-l {
		padding-left: 30rpx;
	}
	.archive-nav-btn-r {
		padding-right: 30rpx;
	}
	.archive-nav-placeholder {
		padding-left: 30rpx;
		width: 64rpx;
	}
	
	
	/* 表单部分 */
	.archive-form {
		position: relative;
		padding-top: 140rpx;
	}
	.archive-input-group {
		position: relative;
		padding-top: 30rpx;
		padding-left: 23rpx;
	}
	.archive-input-tips {
		display: inline-block;
		font-size: 24rpx;
		color: #00A0EB;
	}
	.archive-input-2,
	.archive-input-4
	{
		position: absolute;
		top: 45%;
		left: 23rpx;
		display: inline-block;
		border-bottom: 1rpx solid #E8E8E8;
		font-size: 30rpx;
		padding-left: 144rpx;
		width: 542rpx;
	}
	.archive-input-short {
		width: 386rpx!important;
	}
/* 	.archive-input-2 {
		padding-left: 72rpx;
		width: 612rpx;
	}
	.archive-input-4 {
		padding-left: 120rpx;
		width: 566rpx;
	} */
	.archive-input-disabled {
		color: #797979;
	}
	.archive-img {
		position: absolute;
		right: 34rpx;
		top: 190rpx;
		width: 142rpx;
		height: 201rpx;
	}
</style>
