<template>
	<!-- 用户简略消息 -->
	<view class="alumnus-my__msgs__user-msg-simple u-f-ajc"
	hover-class="alumnus-my__msgs__user-msg-simple-active"
	hover-stay-time="0"
	@tap="navToFriendChat(item.uid, item.nickname, item.headImg)">
		<!-- 头像部分 -->
		<view class="alumnus-my__msgs__user-msg-simple__head u-f-ajc">
			<view class="alumnus-my__msgs__user-msg-simple__head-container u-f-ajc">
				<image class="alumnus-my__msgs__user-msg-simple__head-img" :src="item.headImg" mode="scaleToFill" lazy-load></image>
				<template v-if="item.greenPoint">
					<view class="alumnus-my__msgs__user-msg-simple__head-point"></view>
				</template>
			</view>
		</view>
		
		<!-- 昵称消息部分 -->
		<view class="alumnus-my__msgs__user-msg-simple__msg u-f-ac">
			<view>
				<view class="alumnus-my__msgs__user-msg-simple__msg-nick">{{item.nickname}}</view>
				<view class="alumnus-my__msgs__user-msg-simple__msg-show">{{item.msgSimple}}</view>
			</view>
		</view>
		
		<!-- 时间数量部分 -->
		<view class="alumnus-my__msgs__user-msg-simple__timeNumber u-f-ajc">
			<view class="alumnus-my__msgs__user-msg-simple__timeNumber-container u-f-ajc">
				<view class="alumnus-my__msgs__user-msg-simple__time">{{dt2dtshow(item.datetime)}}</view>
				<template v-if="item.number">
					<view class="alumnus-my__msgs__user-msg-simple__number u-f-ajc"
					:style="{width: calcRedPointWidth(num2numshow(item.number)) + 'px'}">
						{{num2numshow(item.number)}}
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			Item: Object,
			screenWidth: Number,
			screenHeight: Number
		},
		data() {
			return {
				item: this.Item
			}
		},
		methods: {
			// 页面跳转
			navToFriendChat(uid, nickname, friendHeadImg) {
				uni.navigateTo({
					url: '../../pages/friend_chat/friend_chat?'
					+ 'uid=' + uid
					+ '&nickname=' + nickname
					+ '&friendHeadImg=' + friendHeadImg
					+ '&myHeadImg=' + '../../static/images/personal_center/user-default.jpg'
				});
			},
			// 尺寸工具
			rpx2px(width) {
				return this.screenWidth / 750 * width
			},
			// 时间工具
			dateFormat(fmt, date) {
			    let ret;
			    const opt = {
			        "Y+": date.getFullYear().toString(),        // 年
			        "m+": (date.getMonth() + 1).toString(),     // 月
			        "d+": date.getDate().toString(),            // 日
			        "H+": date.getHours().toString(),           // 时
			        "M+": date.getMinutes().toString(),         // 分
			        "S+": date.getSeconds().toString()          // 秒
			        // 有其他格式化字符需求可以继续添加，必须转化成字符串
			    };
			    for (let k in opt) {
			        ret = new RegExp("(" + k + ")").exec(fmt)
			        if (ret) {
			            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			        }
			    }
			    return fmt
			},
			getWeekDate(date) {
				var day = date.getDay()
				var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
				var week = weeks[day]
				return week
			},
			// 数据显示转换工具
			dt2dtshow(dt) {
				var now = new Date()
				var last = new Date(dt)
				now.setHours(0)
				now.setMinutes(0)
				now.setSeconds(0)
				now.setDate(now.getDate() + 1)
				var days_diff = (Date.parse(now) - Date.parse(last)) / (1 * 24 * 60 * 60 * 1000)
				if (days_diff < 1) {
					return this.dateFormat("HH:MM", last)
				} else if (days_diff < 2) {
					return "昨天"
				} else if (days_diff < 8) {
					return this.getWeekDate(last)
				}
				return this.dateFormat("YYYY-mm-dd", last)
			},
			num2numshow(num) {
				if (num < 100)
					return '' + num
				return "99+"
			},
			calcRedPointWidth(str) {
				return this.rpx2px(str.length * 8 + 32)
			}
		}
	}
</script>

<style>
	/* 消息数据部分 */
	.alumnus-my__msgs__user-msg-simple {
		position: relative;
		width: 750rpx;
		height: 140rpx;
	}
	.alumnus-my__msgs__user-msg-simple-active {
		background-color: #F1F1F1;
	}
	.alumnus-my__msgs__user-msg-simple__head {
		position: absolute;
		left: 25rpx;
	}
	.alumnus-my__msgs__user-msg-simple__head-container {
		position: relative;
	}
	.alumnus-my__msgs__user-msg-simple__head-img {
		width: 91rpx;
		height: 91rpx;
		border-radius: 200rpx;
	}
	.alumnus-my__msgs__user-msg-simple__head-point {
		position: absolute;
		right: -5rpx;
		top: -5rpx;
		
		background-color: #46BD65;
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 100rpx;
	}
	.alumnus-my__msgs__user-msg-simple__msg {
		position: absolute;
		left: 151rpx;
		width: 440rpx;
		/* border: 1px solid red; */
	}
	.alumnus-my__msgs__user-msg-simple__msg-nick {
		font-size: 24rpx;
		font-weight: 500;
		width: 440rpx;
		/* 昵称也许用不到省略 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.alumnus-my__msgs__user-msg-simple__msg-show {
		color: #929191;
		font-size: 24rpx;
		width: 440rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.alumnus-my__msgs__user-msg-simple__timeNumber {
		position: absolute;
		right: 0;
	}
	.alumnus-my__msgs__user-msg-simple__timeNumber-container {
		position: relative;
		
		width: 159rpx;
		height: 90rpx;
		/* border: 1px solid red; */
	}
	.alumnus-my__msgs__user-msg-simple__time {
		position: absolute;
		top: 0;
		
		font-size: 24rpx;
		font-weight: 500;
		color: #929191;
	}
	.alumnus-my__msgs__user-msg-simple__number {
		position: absolute;
		bottom: -5rpx;
		
		color: #FFFFFF;
		height: 40rpx;
		font-size: 24rpx;
		background-color: #FF0000;
		border-radius: 200rpx;
	}
</style>
