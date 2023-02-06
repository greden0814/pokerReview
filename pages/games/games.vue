<template>
	<view>
		<button @click="addNewGame">新增牌局</button>
		<scroll-view scroll-y="true" class="scroll-view">
			<view v-for="(item,index) in list" :key="index" @click="goDetails">{{item}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				list: [
					"第一场测试",
					"第二场测试"
				]
			}
		},
		methods: {
			goDetails() {
				uni.navigateTo({
					url: "/pages/details/details"
				})
			},
			addNewGame() {
				uni.navigateTo({
					url: "/pages/addNewGame/addNewGame"
				})
			},
		}
	}
</script>

<style lang="less">
.scroll-view {
	height: 300rpx;
}
</style>
