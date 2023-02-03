<template>
	<view class="flopPage">
		<view class="flopCards">
			<view class="">
				设置转排：
			</view>
			<view class="card" v-for="(card,index) in cards" @click="setCard(index)">
				{{cardTypes[cards[index].type]}}{{cards[index].num}}
			</view>
		</view>
		<view class="steps">
			
		</view>
		<view class="cardTypeChosen" v-show="typeListVisible">
			<cover-image class="cardType" v-for="item in [0,1,2,3]" :src="`../../static/image/${item}.png`"
				@click="choseType(item)"></cover-image>
		</view>
		<view class="cardNumChosen" v-show="numListVisible">
			<view class="cardNum" :class="`cardNum${num}`" v-for="num in cardNum" @click="choseNum(num)">{{num}}</view>
		</view>
		<view class="operationBar">
			<button @click="goTurn">设置转牌</button>
		</view>
	</view>
</template>

<script>
	import data from "@/static/data/data.js"
	export default {
		data() {
			return {
				typeListVisible: false,
				numListVisible: false,
				cardTypes: data.cardType,
				cardNum: data.cardNum,
				cards: [],
				flopDeck: {
					cards: [],
					bid: []
				},
			}
		},
		onReady() {
			for (let i = 0; i < 3; i++) {
				this.cards.push({
					type: "",
					num: "",
				})
			}
		},
		methods: {

			setCard(index) {
				this.typeListVisible = true
				this.settingCard = index
			},
			choseType(type) {
				this.typeListVisible = false
				this.numListVisible = true
				this.chosenType = type
			},
			choseNum(num) {
				this.$set(this.cards[this.settingSeat].card, this.settingCard, {
					type: this.chosenType,
					num: num
				})
				this.numListVisible = false
			},
			goTurn() {
				uni.navigateTo({
					url: "/pages/turnPage/turnPage"
				})
			}
		}
	}
</script>

<style lang="less">
.flopPage {
	.flopCards {
					display: flex;
					height: 60px;
		.card {
			
				border: 1px solid #000;
				width: 40px;
				margin-right: 3px;
		}
	}
}
</style>
