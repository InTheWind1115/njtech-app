<!-- 个人中心 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="nav u-f-jsb u-f-ac">
			<!-- 左上角返回[文字]按钮 -->
			<button class="nav-btn-left-default"
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
				<image class="user-base-head" :src="user.headImgUrl" mode="aspectFit" lazy-load=""></image>
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
					<button class="user-base-cert-btn-default"
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
			<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap">
				
			</swiper-tab-head>
			
			<!-- 分享栏的内容栏 -->
			<view class="uni-tab-bar">
				<swiper class="swiper-box" :current="tabIndex" @change="tabChange">
					<!-- 动态（带完善） -->
					<swiper-item>
					</swiper-item>
					<!-- 照片 -->
					<swiper-item>
					</swiper-item>
					<!-- 视频 -->
					<swiper-item>
					</swiper-item>
				</swiper>
			</view>
			<uni-grid class="user-share-content-grid" :column="2" :showBorder="false" :square="false">
				<uni-grid-item class="user-share-content-grid-item" v-for="(item, index) in user.share.imgs" :key="index">
					<view class="u-f-ajc">
						<image class="user-share-content-img u-f-ajc" :src="item" mode="aspectFill" lazy-load></image>
					</view>
				</uni-grid-item>
			</uni-grid>
			
		</view>
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import swiperTabHead from "../../components/common/swiper-tab-head.vue";
	
	export default {
		components: {
			uniPopup,
			uniGrid,
			uniGridItem,
			swiperTabHead
		},
		data() {
			return {
				pop_tips: ['选项1', '选项2', '……', '选项n'],
				btn_data: [
					['个人档案', '../../static/images/personal_center/per_archives.jpg'],
					['交易明细', '../../static/images/personal_center/per_deal.jpg'],
					['我的校友', '../../static/images/personal_center/per_sch_my.jpg'],
					['推荐校友', '../../static/images/personal_center/per_sch_rec.jpg']
				],
				
				tabIndex: 1,
				tabBars: [
					{name: "动态", id: "dynamic"},
					{name: "照片", id: "pics"},
					{name: "视频", id: "videos"}
				],
				
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
					share: {
						dynamic: [
							
						],
						imgs: [
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827739642&di=15b488ecf34c15f52ba3f8eccdf1ef81&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1301%2F04%2Fc1%2F17113466_1357280465816.jpg',
							'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3716203394,655943366&fm=26&gp=0.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827582328&di=c6518b62e613d705f0fac0d29432a75b&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1857632805%2C3033009870%26fm%3D214%26gp%3D0.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827683458&di=22905af5dcc9bc80d3aa6021db560352&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F53cc78dd80716.jpg',
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596827700845&di=0893685c7d592e0adaa695b6800e9692&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18313%2F18312897.jpg'
						],
						videos: [
							
						]
						
					}
				},
				
				screenHeight: ''  // 屏幕高度（单位px）
			}
		},
		methods: {
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
				// （功能待定）
				// （功能待定）
				// （功能待定）
				
				// 关闭弹出框
				this.$refs.popup.close();
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
				// （待完善）
				// （待完善）
				// （待完善）
				console.log(this.tabIndex)
			}
		},
		onLoad() {
			// 获取屏幕高度
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
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
	}
	.pop-item-active {
		background-color: #DDDDDD;
	}
	
	
	/* 用户基本数据（第一行） */
	.user-base {
		padding-top: 165rpx;
	}
	.user-base-head {
		width: 150rpx;
		height: 150rpx;
		border-radius: 200rpx;
		margin-left: 56rpx;
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
		font-size: 36rpx;
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
		box-shadow: 4rpx 4rpx 9rpx 6rpx rgba(0, 0, 0, 0.1);
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
</style>
