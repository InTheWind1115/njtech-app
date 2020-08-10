<!-- 测试前后端环境 -->
<template>
	<view>
		<button type="primary" @tap="testGetStringData">获取字符串数据测试</button>
		<button type="primary" @tap="testGetArrayData">获取数组数据测试</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			testGetStringData() {
				uni.request({
					url: 'http://202.119.245.23/api-dev/v3/testUser/hello',
					method: 'POST',
					success: res => {
						uni.showModal({
							title: '返回字符串结果',
							content: res.data,
							showCancel: false,
							confirmText: '确认'
						});
					}
				});
			},
			testGetArrayData() {
				uni.request({
				    url: 'http://202.119.245.23/api-dev/v3/testUser/list',
					method: 'POST',
				    success: res => {
						var tempData = '';
						for (var item of res.data) {
							debugger;
							tempData += ('id:' + item.id + '\n');
							tempData += ('openId:' + item.openId + '\n');
							tempData += ('telephone:' + item.telephone + '\n');
							tempData += ('realName:' + item.realName + '\n');
							tempData += ('nickName:' + item.nickName + '\n');
							tempData += ('email:' + item.email + '\n');
							tempData += ('isAdmin:' + item.isAdmin + '\n');
							tempData += ('avatarUrl:' + item.avatarUrl + '\n');
							tempData += ('createdOn:' + item.createdOn + '\n');
							tempData += ('modifiedOn:' + item.modifiedOn + '\n');
							tempData += ('lastLoginTime:' + item.lastLoginTime + '\n');
							tempData += ('lastLoginIp:' + item.lastLoginIp + '\n');
							tempData += '-----------------------------';
						}
						uni.showModal({
							title: '返回数组结果',
							content: tempData,
							showCancel: false,
							confirmText: '确认'
						});
				    }
				});
			}
		}
	}
</script>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 350rpx;
		height: 50rpx;
		margin-top: 50rpx;
		font-size: 30rpx;
		line-height: 50rpx;
	}
</style>
