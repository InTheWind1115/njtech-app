<!-- 好友聊天 -->
<template>
	<view class="outer" :style="'height: ' + screenHeight + 'px'">
		<!-- 顶部导航栏 -->
		<view class="friend-chat__nav u-f-jsb u-f-ac">
			<view class="friend-chat__nav__placeholder"></view>
			<view class="friend-chat__nav__title">{{nickname}}</view>
			<view class="friend-chat__nav__btn friend-chat__nav__btn-r icon iconfont icon-dianhua" @tap="communicate"></view>
			
			<!-- 右上角[更多]图标按钮点击弹出层 -->
			<uni-popup ref="popup" type="bottom">
				<view class="pop-item pop-item-tips u-f-ajc">
					你可以选择以下通话操作
				</view>
				
				<view class="pop-item u-f-ajc"
				hover-class="pop-item-active"
				hover-start-time="0"
				hover-stay-time="0"
				@tap="call('sounds')">
					语音通话
				</view>
				
				<view class="pop-item u-f-ajc"
				hover-class="pop-item-active"
				hover-start-time="0"
				hover-stay-time="0"
				@tap="call('videos')">
					视频通话
				</view>
				
				<view class="pop-item-mask"></view>
				
				<view class="pop-item u-f-ajc"
				hover-class="pop-item-active"
				hover-start-time="0"
				hover-stay-time="0"
				@tap="cancelCommunicate">
					取消
				</view>
			</uni-popup>
		</view>
		
		<!-- 消息栏 -->
		<view class="friend-chat__msgs">
			<view class="friend-chat__msgs__container">
				<scroll-view scroll-y
				scroll-with-animation='true'
				:style="{height: swiperHeight + 'px'}"
				:scroll-into-view="emptyBottom"
				:scroll-top="5">
					<block v-for="(item, index) in msgs" :key="index">
						<template v-if="item.who == 0">
							<view class="friend-chat__msgs__item">
								<image class="friend-chat__msgs__head friend-chat__msgs__head-my"
								:src="myHeadImg"
								mode="scaleToFill"
								lazy-load/>
								
								<view class="friend-chat__msgs__msg friend-chat__msgs__msg-r">
									<view class="triangle-r"></view>
									<view class="fill-r"></view>
									<view class="friend-chat__msgs__msg-content">{{item.content}}</view>
								</view>
							</view>
						</template>
						<template v-else-if="item.who == 1">
							<view class="friend-chat__msgs__item">
								<image class="friend-chat__msgs__head friend-chat__msgs__head-friend"
								:src="friendHeadImg"
								mode="scaleToFill"
								lazy-load/>
								
								<view class="friend-chat__msgs__msg friend-chat__msgs__msg-l">
									<view class="triangle-l"></view>
									<view class="fill-l"></view>
									<view class="friend-chat__msgs__msg-content">{{item.content}}</view>
								</view>
							</view>
						</template>
					</block>
					
					<view :id="'eb_' + msgs.length"></view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 发送栏 -->
		<view class="friend-chat__send">
			<view class="friend-chat__send__container">
				<textarea class="friend-chat__send__ipt u-f-ajc"
				placeholder="Type word......"
				placeholder-class="friend-chat__send__ipt-hint"
				fixed="true"
				v-model="text"/>
				
				<button class="friend-chat__send__btn-default u-f-ajc"
				:hover-class="{'friend-chat__send__btn-selected': !disabled}"
				hover-start-time="0"
				type="default"
				:class="{'friend-chat__send__btn-disabled': disabled}"
				:disabled="disabled"
				@touchend.prevent="send">Send</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components: {
			uniPopup
		},
		computed: {
			swiperHeight() {
				return this.screenHeight - this.rpx2px(241)
			}
		},
		watch: {
			text(val) {
				this.buttonChange()
			}
		},
		data() {
			return {
				// 消息相关
				myHeadImg: '',
				friendHeadImg: '',
				nickname: '',
				msgs: [
					{
						type: 0,  // 0——文字，1——图片（Tips：多半用不到图片）
						who: 0,  // 0——自己，1——好友
						time: 1600089071418,  // 时间戳（ms）
						content: '发生了什么'
					},
					{
						type: 0,
						who: 1,
						time: 1600089852418,
						content: '9 月 13 日下午 5 点多，位于南京市升州路水西门公交站旁一棵大树突然倒下，砸中了一辆小轿车。从市民拍摄的照片中可以看到，轿车车顶部受损严重。据附近店主称，除一辆小轿车外，另一辆公交车也受到剐蹭，目前没有人受伤。'
					},
					{
						type: 0,
						who: 0,
						time: 1600089855448,
						content: '啊这，实在实在实在实在实在实在实在实在是太太太太太太太危险了，危险果然无处不在啊'
					},
					{
						type: 0,
						who: 0,
						time: 1600089855448,
						content: '啊这，实在实在实在实在实在实在实在实在是太太太太太太太危险了，危险果然无处不在啊'
					},
					{
						type: 0,
						who: 0,
						time: 1600089855448,
						content: '啊这，实在实在实在实在实在实在实在实在是太太太太太太太危险了，危险果然无处不在啊'
					},
					{
						type: 0,
						who: 0,
						time: 1600089855448,
						content: '啊这，实在实在实在实在实在实在实在实在是太太太太太太太危险了，危险果然无处不在啊'
					}
				],
				emptyBottom: '',
				
				// 发送栏相关
				disabled: true,
				text: '',
				
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
			buttonChange() {
				if (this.text) {
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			// 导航栏相关
			communicate() {
				this.$refs.popup.open();
			},
			cancelCommunicate() {
				this.$refs.popup.close();
			},
			// 通话相关
			call(type) {
				switch (type) {
					case 'sounds':
						/// （待完善）
						uni.showToast({title: '语音通话', icon: 'none'})
						break;
					case 'videos':
						/// （待完善）
						uni.showToast({title: '视频通话', icon: 'none'})
						break;
					default:
						break;
				}
				this.$refs.popup.close()
			},
			// 消息相关
			send() {
				
				/// （待完善，模拟请求发送数据）
				var msgTmp = {
					type: 0,
					who: 0,
					time: new Date().getTime(),
					content: this.text
				}
				this.msgs.push(msgTmp)
				this.text = ''
				this.disabled = true
				
                this.emptyBottom = "";  
                //设置viewIndex值，使聊天滚动到底部  
                this.$nextTick(() => {  
                    this.emptyBottom = 'eb_' + this.msgs.length

                })
			}
		},
		onShow() {
			// 获取屏幕尺寸
			this.screenWidth = uni.getSystemInfoSync().windowWidth
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			
			// 定位
			this.emptyBottom = 'eb_' + this.msgs.length
		},
		onLoad(option) {
			this.nickname = option.nickname
			this.friendHeadImg = option.friendHeadImg
			this.myHeadImg = option.myHeadImg
			console.log(option.uid)
		}
	}
</script>

<style>
	/* 顶部导航栏 */
	.friend-chat__nav{
		position: fixed;
		width: 750rpx;
		height: 100rpx;
		z-index: 1;
		padding-top: 40rpx;
		border-bottom: 1rpx solid #D9D9D9;
	}
	.friend-chat__nav__title {
		font-size: 48rpx;
		font-weight: 500;
		
		/* （Tips：本考虑用超长省略号的，但是这样水平居中太难了，暂时放弃） */
		/* （考虑约束昵称长度来保障） */
	}
	.friend-chat__nav__btn {
		font-size: 36rpx;
		color: #7C7B7B;
		font-weight: 600;
	}
	.friend-chat__nav__btn-r {
		padding-right: 30rpx;
		/* color: #0DA4EC; */
	}
	.friend-chat__nav__placeholder {
		padding-left: 30rpx;
		width: 64rpx;
	}
	
	
	/* 弹出框元素内容样式 */
	.pop-item {
		background-color: #FFFFFF;
		color: #000000;
		border-bottom: 1rpx solid #EEEEEE;
		padding: 15rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 36rpx;
	}
	.pop-item-active {
		background-color: #E5E7E6;
	}
	.pop-item-tips {
		font-size: 30rpx;
		color: #797979;
	}
	.pop-item-mask {
		height: 20rpx;
		background-color: #E5E3E4;
	}
	
	
	/* 消息栏 */
	.friend-chat__msgs {
		padding-top: 140rpx;
		/* border: 1px solid red; */
	}
	.friend-chat__msgs__container {
	}
	.friend-chat__msgs__head {
		position: absolute;
		top: 30rpx;
		
		width: 95rpx;
		height: 95rpx;
		border-radius: 200rpx;
	}
	.friend-chat__msgs__head-my {
		right: 26rpx;
	}
	.friend-chat__msgs__head-friend {
		left: 18rpx;
	}
	.friend-chat__msgs__item {
		position: relative;
		
		padding: 44rpx 0;
	}
	.friend-chat__msgs__msg {
		position: relative;
		
		display: inline-block;
		max-width: 424rpx;
		padding: 10rpx 20rpx;
		border-radius: 5px;
		word-break: break-all;
		
		/* border: 1px solid red; */
	}
	.friend-chat__msgs__msg-l {
		margin-left: 135rpx;
		background-color: #EFEEEE;
		border: 1rpx solid #EFEEEE;
	}
	.friend-chat__msgs__msg-r {
		float: right;
		margin-right: 150rpx;
		background-color: #5196F9;
		border: 1rpx solid #FFFFFF;
		color: #FFFFFF;
	}
	.friend-chat__msgs__msg-content {
		overflow: hidden;
		white-space: pre-line;
	}
	.friend-chat__msgs__item:after {
		clear: both;
		display: block;
		content: '';
	}
	.triangle-l,
	.triangle-r {
		position: absolute;
		top: 10px;
		border-width: 5px;
		border-style: solid;
	}
	.triangle-l {
		left: -10px;
		border-color: transparent #EFEEEE transparent transparent;
	}
	.triangle-r {
		right: -10px;
		border-color: transparent transparent transparent #FFFFFF;
	}
	.fill-l,
	.fill-r {
		position: absolute;
		top: 10px;
		border-width: 5px;
		border-style: solid;
	}
	.fill-l {
		left: -9px;
		border-color: transparent #EFEEEE transparent transparent;
	}
	.fill-r {
		right: -9px;
		border-color: transparent transparent transparent #5196F9;
	}
	
	
	/* 发送栏 */
	.friend-chat__send {
		position: fixed;
		bottom: 0;
		z-index: 0;
		
		width: 750rpx;
		height: 101rpx;
		border-top: 1rpx solid #F0F0F0;
		background-color: #FFFFFF;
	}
	.friend-chat__send__container {
		position: relative;
	}
	.friend-chat__send__ipt {
		position: absolute;
		left: 22rpx;
		top: 16rpx;
		
		padding: 0 27rpx;
		width: 469rpx;
		height: 70rpx;
		border-radius: 200rpx;
		border: 1rpx solid #D7D5D5;
		font-size: 36rpx;
		
		word-break: keep-all;
	}
	.friend-chat__send__ipt-hint {
		color: #908E8E;
	}
	.friend-chat__send__btn-default {
		position: absolute;
		right: 32rpx;
		top: 16rpx;
		
		background-color: #398BFF!important;
		width: 163rpx;
		height: 70rpx;
		border-radius: 400rpx;
		color: #FFFFFF!important;
		font-size: 36rpx;
	}
	.friend-chat__send__btn-disabled {
		background-color: #C8DFFF!important;
	}
	.friend-chat__send__btn-selected {
		background-color: #3E73BF!important;
	}
</style>
