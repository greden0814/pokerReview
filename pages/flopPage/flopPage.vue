<template>
	<view class="flopPage">
		<view class="flopCards">
			<view class="">
				设置翻牌：
			</view>
			<view class="card" v-for="(card,index) in cards" :key="index" @click="setCard(index)">
				{{cardTypes[cards[index].type]}}{{cards[index].num}}
			</view>
		</view>
		<view class="steps">
			<view class="" v-for="(step,sidx) in steps" :key="sidx">
				<!-- <view class="title">{{stepChoices[step.choice]}}</view> -->
				<view class="label">
					player {{ step.player }} 
				</view>
				<view class="choiceGroup">
					<button class="choiceStyle" v-for="(choice, cidx) in stepChoices" :key="cidx"
						@click="choiceChange(step,cidx,sidx)" :class="{btnPrimary:cidx === step.choice}">{{choice}}</button>
					<input class="bidInput" :disabled="step.choice !== 2" v-model="step.bid" placeholder="下注金额" />
				</view>
			</view>
		</view>
		<view class="cardTypeChosen" v-show="typeListVisible">
			<cover-image class="cardType" v-for="item in [0,1,2,3]" :src="`../../static/image/${item}.png`"
				@click="choseType(item)" :key="item"></cover-image>
		</view>
		<view class="cardNumChosen" v-show="numListVisible">
			<view class="cardNum" :class="'cardNum' + num" v-for="num in cardNum" :key="num" @click="choseNum(num)">{{num}}</view>
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
				stepChoices: data.stepChoices,
				cards: [],
				settingCard: null,
				chosenType: null,
				flopDeck: {
					cards: [],
					bid: []
				},
				steps: [],
				playerCount: 0,
				lastStep: {},
				currentStep: {},
			}
		},
		onReady() {
			for (let i = 0; i < 3; i++) {
				this.cards.push({
					type: "",
					num: "",
				})
			}
			for (let i = 0; i < this.playerCount; i++) {
				this.steps.push({
					player: i+1,
					btnType: null,
					choice: null,
					bid: 0,
				})
			}
		},
		onLoad(option) {
			this.playerCount = option.num
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
				this.$set(this.cards, this.settingCard, {
					type: this.chosenType,
					num: num
				})
				this.numListVisible = false
			},
			choiceChange(step, cidx, sidx) {
				// 检查选择，为跟注则赋值当前下注额为上一位的额度,为加注则打开输入框
				
				step.choice = cidx
				// 检查是否为当前轮次最后一位,如果是最后一位,需要判断当前轮次是否有人加注,有加注则需要再添加一轮,并且排除fold选手
				if (sidx + 1 === this.playerCount) {
					let tempArr = []
					let lastBid = 0
					let haveRaise = false
					this.steps.forEach(step => {
						if (step.choice == 1) {
							tempArr.push(step)
						} else if (step.choice == 2) {
							if (lastBid < step.bid) {
								lastBid = step.bid
								haveRaise = true
							}
							tempArr.push(step)
						}
					})
				}
			},
			goTurn() {
				uni.navigateTo({
					url: "/pages/turnPage/turnPage"
				})
			},
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

		.steps {
			.choiceGroup {
				display: flex;
				.choiceStyle {
				}
				.btnPrimary {					
					color: #fff;
					background-color: #007aff;
				}
				.bidInput {
					margin-left: 10px;
					width: 100px;
					height: 2.4em;
				}
			}
		}

		.cardTypeChosen {
			position: absolute;
			display: flex;
			width: 220px;
			height: 200px;
			left: calc(50% - 100px);
			flex-wrap: wrap;
			top: calc(50% - 150px);
			background-color: aliceblue;

			.cardType {
				width: 80px;
				margin: 10px;
				height: 90px;
			}
		}

		.cardNumChosen {
			position: absolute;
			display: flex;
			width: 220px;
			height: 200px;
			left: calc(50% - 93px);
			flex-wrap: wrap;
			top: calc(50% - 258px);
			background-color: aliceblue;

			.cardNum {
				width: 40px;
				margin: 10px;
				height: 60px;
				text-align: center;
				line-height: 60px;
				border: 1px solid #000;
			}

			.cardNum1,
			.cardNum12 {
				margin-left: 40px;
				margin-right: 20px;
			}

			.cardNum2,
			.cardNum13 {
				margin-left: 4px;
				margin-right: 20px;
			}
		}
	}
</style>
