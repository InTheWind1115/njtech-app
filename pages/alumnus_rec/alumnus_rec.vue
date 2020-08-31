<!-- 推荐校友 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="alumnus-rec__nav u-f-jsb u-f-ac">
			<view class="alumnus-rec__nav__placeholder"></view>
			
			<view class="alumnus-rec__nav__title">推荐校友</view>
			
			<view class="alumnus-rec__nav__btn-r icon iconfont icon-icon-" @tap="navToFriendSearch"></view>
		</view>
		
		<!-- 添加好友记录栏 -->
		<view class="alumnus-rec__add-history">
			<template v-if="addHis_user">
				<view class="alumnus-rec__add-history__container">
					<user-add-item :AddHis_User="addHis_user" :Type="0"></user-add-item>
					<view class="alumnus-rec__add-history__line2-default u-f-ajc"
					hover-class="alumnus-rec__add-history__line2-selected"
					hover-stay-time="0"
					@tap="navToFriendNotice">
						<view class="alumnus-rec__add-history__line2-text">查看更多</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="alumnus-rec__add-history__container u-f-ajc">
					<view class="alumnus-rec__add-history__none-tips">暂时没有好友通知</view>
				</view>
			</template>
		</view>
		
		<!-- 好友推荐栏 -->
		<view class="alumnus-rec__add-rec">
			<view class="alumnus-rec__add-rec__container"
			:style="'height: ' + (screenHeight - rpx2px(470)) + 'px'">
				<!-- 滚动导航栏 -->
				<view class="u-f-aj">
					<view class="alumnus-rec__add-rec__swiper-tap-head u-f-jsb">
						<block v-for="(tab, index) in tabBars" :key="tab.id">
							<view class="swiper-tab-list" :class="{'active': tabIndex==index}" @tap="tabtap(index)">
								{{tab.name}}
							</view>
						</block>
					</view>
				</view>
				
				<!-- 添加元素栏 -->
				<view class="uni-tab-bar__my">
					<swiper class="swiper-box__my"
					:style="{height: swiperHeight + 'px'}"
					:current="tabIndex"
					@change="tabChange">
						<swiper-item>
							<scroll-view scroll-y :style="{height: swiperHeight + 'px'}">
								<block v-for="(user, index) in addRec_users" :key="index">
									<view class="alumnus-rec__add-rec__list-last-item-style">
										<user-add-item :AddHis_User="user" :Type="1"></user-add-item>
									</view>
								</block>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userAddItem from '../../components/alumnus_rec/user-add-item.vue'
	
	export default {
		components: {
			userAddItem
		},
		computed: {
			swiperHeight() {
				return this.screenHeight - this.rpx2px(590)
			}
		},
		data() {
			return {
				// addHis_user: '',
				addHis_user: {
					uid: 123,
					headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
					nickname: '钟鼓迟迟',
					profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
					isFriend: 0  // 0--未回应，1--已添加，2--已拒绝，3--等待回应
				},
				
				addRec_users: [
					{
						uid: 124,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
						isFriend: 0
					},
					{
						uid: 125,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '超长的简介，超长的简介，超长的简介，超长的简介，超长的简介',
						isFriend: 1
					},
					{
						uid: 126,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '',
						isFriend: 2
					},
					{
						uid: 127,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '   ',
						isFriend: 3
					},
					{
						uid: 128,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '123456789',
						isFriend: 0
					},
					{
						uid: 129,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
						isFriend: 0
					},
					{
						uid: 130,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
						isFriend: 0
					},
					{
						uid: 131,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
						isFriend: 0
					}
				],
				
				// 滚动导航栏相关
				tabIndex: 0,
				tabBars: [
					{name: "推荐", id: "rec"},
					{name: "朋友圈", id: "friend"},
					{name: "校友圈", id: "alumnus"}
				],
				
				// 屏幕尺寸
				screenWidth: 0,
				screenHeight: 0
			}
		},
		methods: {
			// 工具函数
			rpx2px(width) {
				return this.screenWidth / 750 * width;
			},
			// 页面跳转函数
			navToFriendNotice() {
				uni.navigateTo({
					url: '../friend_notice/friend_notice'
				});
			},
			navToFriendSearch() {
				uni.navigateTo({
					url: '../friend_search/friend_search'
				});
			},
			// 滚动导航栏相关
			tabtap(index) {
				this.tabIndex = index
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			}
		},
		onShow() {
			// 获取屏幕尺寸
			this.screenWidth = uni.getSystemInfoSync().windowWidth
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			
			// 好友通知页面是否有清理过的痕迹
			uni.getStorage({
				key: 'friend-notice__cleared',
			    success: (res) => {
					if (res.data) {
						this.addHis_user = ''
						uni.setStorage({
						    key: 'friend-notice__cleared',
						    data: false
						})
					}
			    },
				fail: (res) => {
					console.log("未曾清理过")
				}
			});
		}
	}
</script>

<style>
	/* 导航栏部分 */
	.alumnus-rec__nav {
		position: fixed;
		width: 750rpx;
		height: 100rpx;
		z-index: 1;
		padding-top: 40rpx;
		background-color: #F3F3F3;
	}
	.alumnus-rec__nav__title {
		font-size: 48rpx;
	}
	.alumnus-rec__nav__btn-r {
		font-size: 42rpx;
		color: #7C7B7B;
		font-weight: 600;
		padding-right: 30rpx;
	}
	.alumnus-rec__nav__placeholder {
		padding-left: 30rpx;
		width: 64rpx;
	}
	
	
	/* 添加好友历史栏 */
	.alumnus-rec__add-history {
		padding-top: 140rpx;
		/* border: 1px solid red; */
	}
	.alumnus-rec__add-history__container {
		width: 720rpx;
		height: 240rpx;
		margin: 33rpx 15rpx 0 15rpx;
		border: 1rpx solid #DEDCDC;
		border-radius: 8rpx;
		box-shadow: 0rpx 3rpx 4rpx 0rpx rgba(0, 0, 0, 0.5);
	}
	.alumnus-rec__add-history__line2-default {
		height: 67rpx;
	}
	.alumnus-rec__add-history__line2-selected {
		background-color: #F1F1F1;
	}
	.alumnus-rec__add-history__line2-text {
		color: #00A0EB;
		font-size: 24rpx;
	}
	
	
	/* 好友推荐栏 */
	.alumnus-rec__add-rec {
		margin-top: 29rpx;
		/* border: 1px solid red; */
	}
	.alumnus-rec__add-rec__container {
		margin: 0 15rpx;
		border-radius: 32rpx;
		border: 1rpx solid #E1DFDF;
		box-shadow: 0 3rpx 4rpx 0 rgba(0, 0, 0, 0.5);
	}
	.alumnus-rec__add-rec__swiper-tap-head {
		width: 720rpx;
		height: 72rpx;
		margin: 35rpx 50rpx 0 50rpx;
	}
	.alumnus-rec__add-rec__list-last-item-style:last-child >>> .user-add-item {
		border-bottom: unset;
	}
	
	
	/* 导航栏组件改版 */
	.swiper-tab-list {
		color: #969696;
		font-size: 36rpx;
		font-weight: 500;
	}
	.uni-swiper-tab {
		border-bottom: unset;
	}
	.active {
		color: #000000;
		font-weight: 500;
	}
	
	/* 部分空样式 */
	.alumnus-rec__add-history__none-tips {
		color: #929191;
	}
</style>
