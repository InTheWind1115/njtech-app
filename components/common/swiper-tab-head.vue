<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab">
			<block v-for="(tab, index) in tabBars" :key="tab.id">
				<view class="swiper-tab-list" :class="{'active': tabIndex==index}" @tap="tabtap(index)">
					{{tab.name}}
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabBars: Array,
			tabIndex: Number
		},
		methods: {
			// tabBar点击事件
			tabtap(index) {
				this.$emit('tabtap', index);
			},
		}
	}
</script>

<style>
	.swiper-tab-list {
		color: #969696;
		font-size: 27rpx;
		font-weight: 100;
	}
	
	.uni-swiper-tab {
		border-bottom: unset;
	}
	
	.active {
		color: #000000;
		font-weight: bold;
	}
</style>
