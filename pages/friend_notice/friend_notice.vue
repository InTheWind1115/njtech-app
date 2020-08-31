<!-- 好友通知 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="friend-notice__nav u-f-jsb u-f-ac">
			<button class="friend-notice__nav__btn friend-notice__nav__btn-l u-f-ajc"
			type="default"
			@tap="back">
				返回
			</button>
			
			<view class="friend-notice__nav__title">好友通知</view>
			
			<view class="friend-notice__nav__btn friend-notice__nav__btn-r" @tap="clear">清空</view>
		</view>
		
		<!-- 添加好友历史栏 -->
		<view class="friend-notice__list u-f-ajc">
			<template v-if="addHis_users.length == 0">
				<view class="friend-notice__list-container u-f-ajc"
			:style="'height: ' + (screenHeight - rpx2px(195)) + 'px'">
					<view class="friend-notice__list-none-tips">暂无好友通知</view>
				</view>
			</template>
			<template v-else>
				<view class="friend-notice__list-container">
					<block v-for="(user, index) in addHis_users" :key="index">
						<view class="friend-notice__list-last-item-style">
							<user-add-item :AddHis_User="user" :Type="0"></user-add-item>
						</view>
					</block>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import userAddItem from '../../components/alumnus_rec/user-add-item.vue'
	
	export default {
		components: {
			userAddItem
		},
		data() {
			return {
				addHis_users: [
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
						isFriend: 1
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
					},
					{
						uid: 132,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
						isFriend: 0
					},
					{
						uid: 133,
						headImgUrl: '../../static/images/alumnus_rec/demo-user-head.jpg',
						nickname: '钟鼓迟迟',
						profile: '迟迟钟鼓初长夜，耿耿星河欲曙天。',
						isFriend: 0
					}
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
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 数据处理函数
			clear() {
				this.addHis_users = []
				uni.setStorage({
				    key: 'friend-notice__cleared',
				    data: true
				})
				/// （模拟上传云端，待完善）
			}
		},
		onShow() {
			// 获取屏幕尺寸
			this.screenWidth = uni.getSystemInfoSync().windowWidth
			this.screenHeight = uni.getSystemInfoSync().windowHeight
		}
	}
</script>

<style>
	/* 导航栏部分 */
	.friend-notice__nav{
		position: fixed;
		width: 750rpx;
		height: 100rpx;
		z-index: 1;
		padding-top: 40rpx;
		border-bottom: 1rpx solid #DCDCDC;
		background-color: #FFFFFF;
	}
	.friend-notice__nav__title {
		font-size: 48rpx;
		
		position: absolute;
		left: 279rpx;
	}
	.friend-notice__nav__btn {
		font-size: 32rpx;
		color: #7C7B7B;
		font-weight: 600;
	}
	.friend-notice__nav__btn-l {
		padding-left: 30rpx;
		
		position: absolute;
		left: 30rpx;
		font-size: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 100rpx;
		border: 1rpx solid #00A0EB!important;
		color: #00A0EB!important;
		background-color: #FFFFFF!important;
	}
	.friend-notice__nav__btn-r {
		padding-right: 30rpx;
		
		position: absolute;
		right: 16rpx;
	}
	
	
	/* 添加历史栏 */
	.friend-notice__list {
		padding-top: 165rpx;
		padding-bottom: 30rpx;
		/* border: 1px solid red; */
	}
	.friend-notice__list-container {
		width: 720rpx;
		border: 1rpx solid #E1DFDF;
		border-radius: 32rpx;
		box-shadow: 0 3rpx 4rpx 0 rgba(0, 0, 0, 0.5);
	}
	.friend-notice__list-last-item-style:last-child >>> .user-add-item {
		border-bottom: unset;
	}
	
	/* 添加历史栏空记录样式 */
	.friend-notice__list-none-tips {
		color: #929191;
	}
</style>
