<template>
	<view>
		<scroll-view scroll-y="true" class="scroll-view">
			<view v-for="(item,index) in list" class="game" :class="'bg' + index%2" :key="index" @click="goDetails">{{item}}</view>
		</scroll-view>
		<button class="addNewGame" @click="addNewGame">新增牌局</button>
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
	.addNewGame {
		width: 300px;
	}
.scroll-view {
	height: 200rpx;
	padding-top: 10px;
	.game {
		height: 50px;
		line-height: 50px;
		margin-top: 10px;
		text-align: center;
	}
	.bg0 {
		background-color: beige;
	}
	.bg1 {
		background-color: antiquewhite;
	}
}
</style>
