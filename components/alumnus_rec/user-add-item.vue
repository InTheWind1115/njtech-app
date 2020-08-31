<template>
	<view class="user-add-item-outer-defalut u-f-ajc"
	hover-class="user-add-item-outer-selected"
	hover-stay-time="0"
	@tap="navToFriendAddMore(addHis_user.uid)">
		<view class="user-add-item u-f-ajc">
			<view class="user-add-item-head u-f-ajc">
				<image class="user-add-item-headimg"
				:src="addHis_user.headImgUrl"
				mode="scaleToFill"
				lazy-load></image>
			</view>
			<view class="user-add-item-text u-f-ajc">
				<view>
					<view class="user-add-item-text-nickname">{{addHis_user.nickname}}</view>
					<view class="user-add-item-text-profile">{{Profile}}</view>
				</view>
			</view>
			<view class="u-f-ajc">
				<template v-if="type == 0">
					<template v-if="addHis_user.isFriend == 0">
						<button class="alumus-rec__add__btn u-f-ajc"
						hover-stop-propagation="true"
						type="default"
						@tap.stop="addAcceptFriend(addHis_user.uid)">同意</button>
					</template>
					<template v-else-if="addHis_user.isFriend == 1">
						<view class="user-add-item-btn-pos-tips">已添加</view>
					</template>
					<template v-else-if="addHis_user.isFriend == 2">						
						<view class="user-add-item-btn-pos-tips">已拒绝</view>
					</template>
					<template v-else-if="addHis_user.isFriend == 3">						
						<view class="user-add-item-btn-pos-tips user-add-item-btn-pos-tips-long">等待回应</view>
					</template>
				</template>
				<template v-else-if="type == 1">
					<template v-if="addHis_user.isFriend == 0">
						<button class="alumus-rec__add__btn u-f-ajc"
						hover-stop-propagation="true"
						type="default"
						@tap.stop="addRequestFriend(addHis_user.uid)">添加</button>
					</template>
					<template v-else-if="addHis_user.isFriend == 1">
						<view class="user-add-item-btn-pos-tips">已添加</view>
					</template>
					<template v-else-if="addHis_user.isFriend == 2">						
						<view class="user-add-item-btn-pos-tips">已拒绝</view>
					</template>
					<template v-else-if="addHis_user.isFriend == 3">						
						<view class="user-add-item-btn-pos-tips user-add-item-btn-pos-tips-long">等待回应</view>
					</template>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			AddHis_User: Object,
			Type: Number
		},
		data() {
			return {
				addHis_user: this.AddHis_User,
				type: this.Type  // 0--同意, 1--添加
			}
		},
		computed: {
			Profile() {
				if (this.addHis_user.profile.trim()) {
					return this.addHis_user.profile;
				}
				return '(这个人什么都没有写哦)'
			}
		},
		methods: {
			// 页面跳转
			navToFriendAddMore(uid) {
				uni.navigateTo({
					url: '../../pages/friend_add_more/friend_add_more?uid=' + uid
				});
			},
			// 请求发送与处理
			addAcceptFriend(uid) {
				this.addHis_user.isFriend = 1
				/// （模拟请求：接受对应uid的好友申请，待完善）
				console.log('添加成功')
			},
			addRequestFriend(uid) {
				this.addHis_user.isFriend = 3
				/// （模拟请求：向对应uid发出好友申请，待完善）
				console.log('已发送申请')
			}
		}
	}
</script>

<style scoped>
	.user-add-item-outer-selected {
		background-color: #F1F1F1;
	}
	
	.user-add-item {
		position: relative;
		width: 720rpx;
		height: 171rpx;
		/* padding: 0 18rpx 0 12rpx; */
		border-bottom: 1rpx solid #C9C9C9;
	}
	.user-add-item-head {
		position: absolute;
		left: 12rpx;
	}
	.user-add-item-headimg {
		width: 112rpx;
		height: 112rpx;
		border-radius: 200rpx;
	}
	.user-add-item-text {
		position: absolute;
		left: 159rpx;
		width: 400rpx;
	}
	.user-add-item-text-nickname {
		font-size: 36rpx;
		font-weight: 500;
		width: 400rpx;
	}
	.user-add-item-text-profile {
		color: #929191;
		font-size: 24rpx;
		width: 400rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	/* 按钮样式 */
	.alumus-rec__add__btn {
		position: absolute;
		right: 18rpx;
		width: 144rpx;
		height: 63rpx;
		background-color: #00A0EB!important;
		border-radius: 30rpx;
		color: #FFFFFF!important;
		font-size: 24rpx;
	}
	
	/* 按钮提示文字样式 */
	.user-add-item-btn-pos-tips {
		position: absolute;
		right: 50rpx;
		color: #929191;
	}
	.user-add-item-btn-pos-tips-long {
		right: 35rpx;
	}
</style>
