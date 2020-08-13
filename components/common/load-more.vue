<template>
	<view class="load-more">{{loadtext}}</view>
</template>

<script>
	export default {
		props: {
			loadtext: String
		}
	}
</script>

<style scoped>
	.load-more {
		text-align: center;
		color: #AAAAAA;
		padding: 15rpx 0;
	}
</style>
