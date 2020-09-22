<!-- 我的校友 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="alumnus-my__nav u-f-jsb u-f-ac">
			<view class="alumnus-my__nav__btn alumnus-my__nav__btn-l icon iconfont icon-icon-" @tap="navToFriendMySearch"></view>
			<view class="alumnus-my__nav__title">我的校友</view>
			<view class="alumnus-my__nav__btn alumnus-my__nav__btn-r icon iconfont icon-jiahao" @tap="value1=!value1"></view>
			<chunLei-popups v-model="value1"
			:popData="data1"
			@tapPopup="tapPopup"
			:x="350"
			:y="60"
			placement="top-end">
			</chunLei-popups>
		</view>
		
		<!-- 分类提示栏 -->
		<view class="alumnus-my__text-tips">
			<view class="alumnus-my__text-tips__container u-f-jsb">
				<view class="alumnus-my__text-tips__text-default"
				:class="{'alumnus-my__text-tips__text-active': typeIndex == 0}"
				@tap="typeChange(0)">校友</view>
				<view class="alumnus-my__text-tips__text-default"
				:class="{'alumnus-my__text-tips__text-active': typeIndex == 1}"
				@tap="typeChange(1)">圈子</view>
			</view>
		</view>
		
		<!-- 数据显示栏 -->
		<view class="alumnus-my__msgs">
			<scroll-view scroll-y :style="{height: swiperHeight + 'px'}">
				<template v-if="typeIndex == 0">
					<block v-for="(item, index) in userMsg" :key="index">
						<user-message-simple :Item="item" :screenHeight="screenHeight" :screenWidth="screenWidth"></user-message-simple>
					</block>
				</template>
				<template v-else-if="typeIndex == 1">
					<view class="u-f-ajc" :style="{color: '#999', padding: '200px 0 0 0'}">暂时为空</view>
				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/extShop/chunLei-popups/chunLei-popups.vue"
	import userMessageSimple from "@/components/alumnus_my/user-message-simple.vue"
	
	export default {
		components:{
			chunLeiPopups,
			userMessageSimple
		},
		computed: {
			swiperHeight() {
				return this.screenHeight - this.rpx2px(230)
			}
		},
		data() {
			return {
				// 弹出框数据
				data1:[
					{
						title:'加好友',
						icon:'../../static/images/_component/chunLeiPopups/tianjiahaoyou.png'
					},
					{
						title:'扫一扫',
						icon:'../../static/images/_component/chunLeiPopups/scan_icon.png'
					},
					{
						title:'面对面快传',
						icon:'../../static/images/_component/chunLeiPopups/zhifeiji.png'
					},
					{
						title:'收付款',
						icon:'../../static/images/_component/chunLeiPopups/shoufukuan.png'
					}
				],
				value1: false,
				
				// 分类栏相关
				typeIndex: 0,  // 0代表“校友”，1代表“圈子”
				
				// 消息数据
				userMsg: [
					{
						uid: 128,
						
						headImg: '../../static/images/alumnus_my/demo-user1.jpg',
						greenPoint: true,
						nickname: 'UX Design group',
						msgSimple: 'bsback cjasbksbc sck',
						datetime: '2020-09-05 15:15:15',
						number: 0
					},
					{
						uid: 129,
						
						headImg: '../../static/images/alumnus_my/demo-user2.jpg',
						greenPoint: false,
						nickname: 'Snow Ball',
						msgSimple: '我跟你说下，你昨天说的那个，不是我之前说的那个。。。我说的是那个你懂吗，就是你之前在电影院里看到的那个',
						datetime: '2020-09-13 06:15:59',
						number: 28
					},
					{
						uid: 130,
						
						headImg: '../../static/images/alumnus_my/demo-user3.jpg',
						greenPoint: true,
						nickname: 'Blue Shell',
						msgSimple: '嘿',
						datetime: '2020-01-12 14:14:08',
						number: 5
					},
					{
						uid: 131,
						
						headImg: '../../static/images/alumnus_my/demo-user4.jpg',
						greenPoint: true,
						nickname: 'Weastwall Boy',
						msgSimple: '没事',
						datetime: '2020-09-07 11:12:15',
						number: 0
					},
					{
						uid: 132,
						
						headImg: '../../static/images/alumnus_my/demo-user5.jpg',
						greenPoint: false,
						nickname: 'Pride and Prejudice',
						msgSimple: '没关系的',
						datetime: '2020-09-14 00:00:18',
						number: 43
					},
					{
						uid: 133,
						
						headImg: '../../static/images/alumnus_my/demo-user1.jpg',
						greenPoint: true,
						nickname: 'Blue Shell',
						msgSimple: '谢谢',
						datetime: '2020-09-08 10:52:48',
						number: 152
					},
					{
						uid: 134,
						
						headImg: '../../static/images/alumnus_my/demo1.jpg',
						greenPoint: false,
						nickname: 'Pride and Prejudice',
						msgSimple: '傲慢',
						datetime: '2020-09-06 15:12:18',
						number: 97
					},
					{
						uid: 135,
						
						headImg: '../../static/images/alumnus_my/demo2.jpg',
						greenPoint: false,
						nickname: 'Pride and Prejudice',
						msgSimple: '无语',
						datetime: '2020-09-14 11:12:18',
						number: 0
					},
					{
						uid: 136,
						
						headImg: '../../static/images/alumnus_my/demo3.jpg',
						greenPoint: false,
						nickname: 'Pride and Prejudice',
						msgSimple: '无语',
						datetime: '2020-09-13 23:12:18',
						number: 0
					},
					{
						uid: 137,
						
						headImg: '../../static/images/alumnus_my/demo-user4.jpg',
						greenPoint: true,
						nickname: 'Pride and Prejudice',
						msgSimple: '无语',
						datetime: '2020-08-26 11:12:18',
						number: 0
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
				return this.screenWidth / 750 * width
			},
			dt2dtshow(dt) {
				return dt.substr(0, 10)
			},
			num2numshow(num) {
				return num
			},
			// 比较函数
			sortDatetime(a, b) {
				// console.log(new Date(a.datetime))
				// console.log(new Date(b.datetime))
				// console.log(new Date(a.datetime).getTime() < new Date(b.datetime).getTime())
			    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
			},
			// 页面跳转函数
			navToFriendMySearch() {
				uni.navigateTo({
					url: '../friend_my_search/friend_my_search'
				})
			},
			// 弹出栏组件函数
			tapPopup(e){
				uni.showToast({
					title:e.title,
					icon:'none'
				})
			},
			// 显示内容类型切换相关
			typeChange(index) {
				this.typeIndex = index
			}
			
		},
		onShow() {
			// 获取屏幕尺寸
			this.screenWidth = uni.getSystemInfoSync().windowWidth
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			
			/// （待完善，获取后端数据）
			
			// 对消息按照时间进行排序
			this.userMsg.sort(this.sortDatetime)
		}
	}
</script>

<style>
	/* 导航栏部分 */
	.alumnus-my__nav{
		position: fixed;
		width: 750rpx;
		height: 100rpx;
		z-index: 1;
		padding-top: 40rpx;
		background-color: #F3F3F3;
	}
	.alumnus-my__nav__title {
		font-size: 48rpx;
	}
	.alumnus-my__nav__btn {
		font-size: 42rpx;
		color: #7C7B7B;
		font-weight: 600;
	}
	.alumnus-my__nav__btn-l {
		padding-left: 30rpx;
	}
	.alumnus-my__nav__btn-r {
		padding-right: 30rpx;
	}
	
	
	/* 分类提示栏 */
	.alumnus-my__text-tips {
		padding-top: 140rpx;
		/* border: 1px solid red; */
	}
	.alumnus-my__text-tips__container {
		padding: 16rpx 25rpx 8rpx 25rpx;
	}
	.alumnus-my__text-tips__text-default {
		font-weight: 600;
		font-size: 36rpx;
		color: #A4A3A3;
	}
	.alumnus-my__text-tips__text-active {
		color: #26AEED;
	}
</style>