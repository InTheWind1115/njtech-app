<!-- 个人中心 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="nav u-f-jsb u-f-ac">
			<!-- 左上角返回[文字]按钮 -->
			<button class="nav-btn-left-default u-f-ajc"
			type="default"
			@tap="back">
				返回
			</button>
			
			<!-- 右上角[更多]图标按钮 -->
			<view class="nav-btn-right-default icon iconfont icon-gengduo" @tap="more">
			</view>
			
			<!-- 右上角[更多]图标按钮点击弹出层 -->
			<uni-popup ref="popup" type="bottom">
				<block v-for="(item, index) in pop_tips" :key="index">
					<view class="pop-item u-f-ajc"
					hover-class="pop-item-active"
					hover-start-time="0"
					hover-stay-time="0"
					@tap="clickMore(index)">
						{{item}}
					</view>
				</block>
			</uni-popup>
		</view>
		
		<!-- 用户基本数据 -->
		<view class="user-base">
			<!-- 第一行 -->
			<view class="user-base-1 u-f-jsb u-f-ac">
				<!-- 头像 -->
				<view class="user-base-head u-f-ajc">
					<image class="user-base-head-img" :src="user.headImgUrl" mode="scaleToFill" lazy-load=""></image>
					<view class="user-base-head-shot u-f-ajc icon iconfont icon-xiangji" @tap="chooseImage"></view>
				</view>
				<!-- 动态、照片等数字数据 -->
				<block v-for="(item, index) in user.nums_base_data" :key="index">
					<view class="user-base-num">
						<view class="user-base-num-data u-f-ajc">
							{{item[1]}}
						</view>
						<view class="user-base-num-str u-f-ajc">
							{{item[0]}}
						</view>
					</view>
				</block>
			</view>
			<!-- 第二行 -->
			<view class="user-base-2 u-f-jsb u-f-ac">
				<!-- 昵称 -->
				<view class="user-base-nickname">{{user.nickname}}</view>
				<!-- 认证情况 -->
				<template v-if="!user.isCertificated">
					<button class="user-base-cert-btn-default u-f-ajc"
					type="default"
					@tap="navToCertificate">
						认证校友
					</button>
				</template>
			</view>
			<!-- 第三行 -->
			<view class="user-base-3">
				<!-- 个性签名/个人简介 -->
				<view class="user-base-profile">
					{{user.profile}}
				</view>
			</view>
		</view>
		
		<!-- 中间按钮栏 -->
		<view class="user-center-btn-bar">
			<view class="user-center-btn-bar-container u-f-jsb u-f-ac">
				<!-- （循环）列表渲染按钮 -->
				<block v-for="(item, index) in btn_data" :key="index">
					<view class="user-center-btn-bar-btngroup" @tap="btnResponse(index)">
						<image class="user-center-btn-bar-img u-f-ajc"
						:src="item[1]"
						mode="aspectFit"
						lazy-load/>
						<view class="user-center-btn-bar-str u-f-ajc">
							{{item[0]}}
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<!-- 用户分享栏 -->
		<view class="user-share">
			<!-- 分享栏的导航栏 -->
			<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
			
			<!-- 分享栏的内容栏 -->
			<view class="uni-tab-bar" @touchstart="scrollToBottom">
			<!-- <view class="uni-tab-bar"> -->
				<swiper class="swiper-box"
				:style="{height: (screenHeight) - rpx2px(230) + 'px'}"
				:current="tabIndex"
				@change="tabChange">
					<!-- 动态（待完善） -->
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore">
							<template v-if="!user.share[0].length">
								<image class="animated fadeIn" src="../../static/images/personal_center/nothing.png" mode="widthFix" lazy-load></image>
							</template>
							<template v-else>
								<!-- （待完善） -->
								<load-more :loadtext="loadTexts1"></load-more>
							</template>
						</scroll-view>
					</swiper-item>
					<!-- 照片 -->
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore">
							<template v-if="!user.share[1].length">
								<image class="animated fadeIn" src="../../static/images/personal_center/nothing.png" mode="widthFix" lazy-load></image>
							</template>
							<template v-else>
								<uni-grid class="user-share-content-grid" :column="2" :showBorder="false" :square="false">
									<uni-grid-item class="user-share-content-grid-item" v-for="(item, index) in user.share[1]" :key="index">
										<view class="u-f-ajc">
											<image class="user-share-content-img u-f-ajc animated fadeIn" :src="item" mode="aspectFill" lazy-load></image>
										</view>
									</uni-grid-item>
								</uni-grid>
								<load-more :loadtext="loadTexts2"></load-more>
							</template>
						</scroll-view>
					</swiper-item>
					<!-- 视频 -->
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore">
							<template v-if="!user.share[2].length">
								<image src="../../static/images/personal_center/nothing.png" mode="widthFix" lazy-load></image>
							</template>
							<template v-else>
								<uni-grid class="user-share-content-grid" :column="2" :showBorder="false" :square="false">
									<uni-grid-item class="user-share-content-grid-item" v-for="(item, index) in user.share[2]" :key="index">
										<view class="u-f-ajc">
											<image class="user-share-content-img u-f-ajc animated fadeIn" :src="item.imgurl" mode="aspectFill" lazy-load></image>
											<view class="user-share-content-video-play icon iconfont icon-bofang animated fadeIn"></view>
											<view class="user-share-content-video-playinfo u-f-ajc animated fadeIn">
												{{videoLongFormat(item.timelong)}}
											</view>
										</view>
									</uni-grid-item>
								</uni-grid>
								<load-more :loadtext="loadTexts3"></load-more>
							</template>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import swiperTabHead from "../../components/common/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
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
		components: {
			uniPopup,
			uniGrid,
			uniGridItem,
			swiperTabHead,
			loadMore
		},
		data() {
			return {
				// 上传图片组件
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 0,
				count: [1],
				
				// tips类
				pop_tips: ['选项1', '选项2', '……', '选项n'],
				btn_data: [
					['个人档案', '../../static/images/personal_center/per_archives.jpg'],
					['交易明细', '../../static/images/personal_center/per_deal.jpg'],
					['我的校友', '../../static/images/personal_center/per_sch_my.jpg'],
					['推荐校友', '../../static/images/personal_center/per_sch_rec.jpg']
				],
				loadTexts1: '上拉加载更多动态',  // 很坑的地方在于用数组会导致页面无法实时更新
				loadTexts2:	'上拉加载更多照片',
				loadTexts3: '上拉加载更多视频',
				loadTextsTips: [
					'动态',
					'照片',
					'视频'
				],
				
				// 滚动导航栏相关
				tabIndex: 1,
				tabBars: [
					{name: "动态", id: "dynamic"},
					{name: "照片", id: "pics"},
					{name: "视频", id: "videos"}
				],
				
				// 用户数据
				user: {
					headImgUrl: '../../static/images/personal_center/user-default.jpg',
					nums_base_data: [ 
						['动态', 98],
						['照片', 276],
						['关注', 105],
						['粉丝', 45]
					],
					nickname: '小松',
					isCertificated: false,
					profile: '现居江苏南京，喜欢看书和旅行，是个建筑工程师。',
					share: [
						[
							
						],
						[
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827739642&di=15b488ecf34c15f52ba3f8eccdf1ef81&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1301%2F04%2Fc1%2F17113466_1357280465816.jpg',
							'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3716203394,655943366&fm=26&gp=0.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827582328&di=c6518b62e613d705f0fac0d29432a75b&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1857632805%2C3033009870%26fm%3D214%26gp%3D0.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827683458&di=22905af5dcc9bc80d3aa6021db560352&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F53cc78dd80716.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827700845&di=0893685c7d592e0adaa695b6800e9692&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18313%2F18312897.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597236730518&di=411036899ae4f7a1f5be8cbde34b842a&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F1befcc72396bf6a938d688f7da4391c7a8d71265.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597236755457&di=fef4938b039d0c265b70580ef8179f48&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F57d275c34709e.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597317638745&di=de12d9a3bce7ce5927715916f720630b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171013%2Ffec49f59b98041a4a16886893447f746.jpeg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597317743085&di=228f84841627028cec62cd19cfa01b30&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-10%2F59dc322046d55.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2147940217,2634043652&fm=26&gp=0.jpg',
							'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1356778551,3334211693&fm=26&gp=0.jpg',
							'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104194953,617480653&fm=26&gp=0.jpg'
						],
						[
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827739642&di=15b488ecf34c15f52ba3f8eccdf1ef81&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1301%2F04%2Fc1%2F17113466_1357280465816.jpg', timelong: 128, videourl: ''},
							{imgurl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3716203394,655943366&fm=26&gp=0.jpg', timelong: 145, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827582328&di=c6518b62e613d705f0fac0d29432a75b&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1857632805%2C3033009870%26fm%3D214%26gp%3D0.jpg', timelong: 32, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827683458&di=22905af5dcc9bc80d3aa6021db560352&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F53cc78dd80716.jpg', timelong: 15, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827700845&di=0893685c7d592e0adaa695b6800e9692&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18313%2F18312897.jpg', timelong: 32, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597236730518&di=411036899ae4f7a1f5be8cbde34b842a&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F1befcc72396bf6a938d688f7da4391c7a8d71265.jpg', timelong: 378, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597236755457&di=fef4938b039d0c265b70580ef8179f48&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F57d275c34709e.jpg', timelong: 198, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597317638745&di=de12d9a3bce7ce5927715916f720630b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171013%2Ffec49f59b98041a4a16886893447f746.jpeg', timelong: 125, videourl: ''},
							{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597317743085&di=228f84841627028cec62cd19cfa01b30&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-10%2F59dc322046d55.jpg', timelong: 169, videourl: ''},
							{imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2147940217,2634043652&fm=26&gp=0.jpg', timelong: 144, videourl: ''},
							{imgurl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1356778551,3334211693&fm=26&gp=0.jpg', timelong: 2, videourl: ''},
							{imgurl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104194953,617480653&fm=26&gp=0.jpg', timelong: 532, videourl: ''}
						]	
					]
				},
				
				// 自动滚动
				scrollFlag: false,
				
				// 仅测试、模拟
				testFlags: [ 0, 0, 0 ],
				
				// 屏幕尺寸
				screenWidth: 0,  // 屏幕宽度（单位px）
				screenHeight: 0  // 屏幕高度（单位px）
			}
		},
		methods: {
			// 工具函数
			rpx2px(width) {
				return this.screenWidth / 750 * width;
			},
			videoLongFormat(t) {
				  if (!t) return;
				  if (t < 60) return "00:" + ((i = t) < 10 ? "0" + i : i);
				  if (t < 3600) return "" + ((a = parseInt(t / 60)) < 10 ? "0" + a : a) + ":" + ((i = t % 60) < 10 ? "0" + i : i);
				  if (3600 <= t) {
				    var a, i, e = parseInt(t / 3600);
				    return (e < 10 ? "0" + e : e) + ":" + ((a = parseInt(t % 3600 / 60)) < 10 ? "0" + a : a) + ":" + ((i = t % 60) < 10 ? "0" + i : i);
				  }
			},
			// 页面跳转函数
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			navToCertificate() {
				uni.navigateTo({
					url: '../certificate/certificate'
				}); 
			},
			navToArchive() {
				uni.navigateTo({
					url: '../archive/archive'
				});
			},
			navToDealRecord() {
				uni.navigateTo({
					url: '../deal_record/deal_record'
				});
			},
			navToAlumnusMy() {
				uni.navigateTo({
					url: '../alumnus_my/alumnus_my'
				});
			},
			navToAlumnusRec() {
				uni.navigateTo({
					url: '../alumnus_rec/alumnus_rec'
				});
			},
			// 导航栏右按钮弹窗相关函数
			more() {
				this.$refs.popup.open();
			},
			clickMore(index) {
				// 根据index完成相应选项的功能【index从0开始】
				/// （功能待定）
				
				// 关闭弹出框
				this.$refs.popup.close();
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
						this.user.headImgUrl = this.imageList[0];
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
			},
			// 中间按钮栏响应函数
			btnResponse(index) {
				switch(index) {
					case 0:
						this.navToArchive();
						break;
					case 1:
						this.navToDealRecord();
						break;
					case 2:
						this.navToAlumnusMy();
						break;
					case 3:
						this.navToAlumnusRec();
						break;
					default:
						break;
				}
			},
			// 分享栏相关函数
			tabtap(index) {
				this.tabIndex = index;
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			loadmore() {
				// 正在加载中或者没有更多数据的时候不会向服务器发送请求
				var tmp;
				if (this.tabIndex === 0) {
					tmp = this.loadTexts1;
				} else if (this.tabIndex === 1) {
					tmp = this.loadTexts2;
				} else if (this.tabIndex === 2) {
					tmp = this.loadTexts3;
				}
				if (!tmp.startsWith('上拉加载更多')) {
					return;
				}
				// 模拟请求数据
				/// （仅模拟，待完善）
				
				// 修改状态为“加载中”
				if (this.tabIndex === 0) {
					this.loadTexts1 = '加载中';
				} else if (this.tabIndex === 1) {
					this.loadTexts2 = '加载中';
				} else if (this.tabIndex === 2) {
					this.loadTexts3 = '加载中';
				}
				setTimeout(()=> {
					// 获取数据
					var obj;
					if (this.testFlags[this.tabIndex] < 2) {
						obj = [
							[],
							[
								'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104194953,617480653&fm=26&gp=0.jpg',
								'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104194953,617480653&fm=26&gp=0.jpg'
							],
							[
								{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597236755457&di=fef4938b039d0c265b70580ef8179f48&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F57d275c34709e.jpg', timelong: 198, videourl: ''},
								{imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597236755457&di=fef4938b039d0c265b70580ef8179f48&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F57d275c34709e.jpg', timelong: 198, videourl: ''},
							]
						];
						++this.testFlags[this.tabIndex];
					} else {
						obj = null;
					}
					// 没有更多数据
					if (!obj) {
						// 修改状态为“没有更多XX了”
						if (this.tabIndex === 0) {
							this.loadTexts1 = '没有更多' + this.loadTextsTips[this.tabIndex] + '了';
						} else if (this.tabIndex === 1) {
							this.loadTexts2 = '没有更多' + this.loadTextsTips[this.tabIndex] + '了';
						} else if (this.tabIndex === 2) {
							this.loadTexts3 = '没有更多' + this.loadTextsTips[this.tabIndex] + '了'
						}
						return;
					}
					// 有更多数据
					for (var item of obj[this.tabIndex]) {
						if (item) {
							this.user.share[this.tabIndex].push(item);  // 加入数组
						}
					}
					// 修改状态为“上拉加载更多XX”
					if (this.tabIndex === 0) {
						this.loadTexts1 = '上拉加载更多' + this.loadTextsTips[this.tabIndex];
					} else if (this.tabIndex === 1) {
						this.loadTexts2 = '上拉加载更多' + this.loadTextsTips[this.tabIndex];
					} else if (this.tabIndex === 2) {
						this.loadTexts3 = '上拉加载更多' + this.loadTextsTips[this.tabIndex];
					}
				}, 700);
			},
			scrollToBottom() {
				if (!this.scrollFlag) {
					this.scrollFlag = true
					uni.pageScrollTo({
						scrollTop: this.screenHeight,
						duration: 300
					});
				}
			}
		},
		onShow() {
			// 标记登录状态（缓存）
			uni.setStorage({
			    key: 'status',
			    data: 'yes'
			});
			
			// 获取用户的相关数据
			/// （待完善）
			
			// 用户的照片/视频应该至少有12张，否则将下拉提示文字显示为“没有更多数据”
			if (this.user.share[1].length < 12) {
				this.loadTexts2 = '没有更多照片了';
			}
			if (this.user.share[2].length < 12) {
				this.loadTexts3 = '没有更多视频了';
			}
			
			// 获取屏幕宽度、高度
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.screenWidth = uni.getSystemInfoSync().windowWidth;
		},
		onPageScroll(e) {
			if (e.scrollTop === 0) {
				this.scrollFlag = false;
			}
		},
		onBackPress() {
			// 返回app首页时删除登录状态
			uni.removeStorage({
			    key: 'status',
			});
		}
	}
</script>

<style>
	/* 导航栏部分 */
	.nav {
		position: fixed;
		background-color: #FFFFFF;
		width: 750rpx;
		height: 160rpx;
		z-index: 1;
	}
	.nav-btn-left-default {
		margin: 20rpx 0 0 30rpx;
		font-size: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 100rpx;
		border: 1rpx solid #00A0EB!important;
		color: #00A0EB!important;
		background-color: #FFFFFF!important;
	}
	.nav-btn-right-default {
		margin: 24rpx 30rpx 0 0;
		font-size: 60rpx;
		color: #D8D8D8;
	}
	
	
	/* 弹出框元素内容样式 */
	.pop-item {
		background-color: #FFFFFF;
		color: #000000;
		border-bottom: 1rpx solid #EEEEEE;
		padding: 15rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-weight: bold;
	}
	.pop-item-active {
		background-color: #DDDDDD;
	}
	
	
	/* 用户基本数据（第一行） */
	.user-base {
		padding-top: 165rpx;
	}
	.user-base-head {
		position: relative;
		margin-left: 56rpx;
	}
	.user-base-head-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 200rpx;
	}
	.user-base-head-shot {
		position: absolute;
		bottom: -25rpx;
		width: 50rpx;
		height: 50rpx;
		font-size: 30rpx;
		color: #979797;
		border-radius: 100rpx;
		background-color: #F8F8F8;
	}
	.user-base-1 {
		margin-right: 54rpx;
	}
	.user-base-num-str {
		color: #818181;
		font-size: 24rpx;
	}
	.user-base-num-data {
		font-weight: 600;
		font-size: 40rpx;
	}
	
	
	/* 用户基本数据（第二行） */
	.user-base-2 {
		padding: 35rpx 380rpx 0 0;
	}
	.user-base-nickname {
		padding-left: 56rpx;
		font-size: 56rpx;
		font-weight: 600;
	}
	.user-base-cert-btn-default {
		background-color: #FFFFFF!important;
		color: #FF9700!important;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		border-radius: 200rpx;
		border: 1rpx solid #FF9700!important;
	}
	
	
	/* 用户基本数据（第三行） */
	.user-base-3 {
		padding: 19rpx 56rpx 0 56rpx;
	}
	.user-base-profile {
		color: #797979;
		font-size: 27rpx;
	}
	
	
	/* 中间按钮栏 */
	.user-center-btn-bar {
		padding: 35rpx 30rpx 0 30rpx;
	}
	.user-center-btn-bar-container {
		padding: 0 64rpx;
		border-radius: 35rpx;
		box-shadow: 3rpx 3rpx 8rpx 5rpx rgba(0, 0, 0, 0.1);
	}
	.user-center-btn-bar-btngroup {
		padding: 29rpx 0;
	}
	.user-center-btn-bar-img {
		width: 88rpx;
		height: 88rpx;
	}
	.user-center-btn-bar-str {
		font-size: 21rpx;
		padding-top: 20rpx;
	}
	
	
	/* 分享栏 */
	.user-share {
		padding-top: 35rpx;
		/* padding: 35rpx 30rpx 0 30rpx; */
		width: 750rpx;
	}
	.user-share-content-grid {
		margin: 0 30rpx;
	}
	.uni-highlight:active {  /* 取消点击高亮 */
		background-color: unset!important;
	}
	.user-share-content-grid-item {
		margin-bottom: 30rpx;
	}
	.user-share-content-img {
		width: 321rpx;
		height: 263rpx;
		border-radius: 32rpx;
	}
	.user-share-content-video-play {
		position: absolute;
		font-size: 80rpx;
		color: #FFFFFF;
	}
	.user-share-content-video-playinfo {
		position: absolute;
		background-color: rgba(51, 51, 51, 0.62);
		color: #FFFFFF;
		bottom: 18upx;
		right: 18upx;
		border-radius: 40upx;
		font-size: 22upx;
		padding: 0 12upx;
	}
</style>
