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
			<view class="" v-for="step in steps">
				<!-- <view class="title">{{stepChoices[step.choose]}}</view> -->
				<radio-group @change="radioChange">
					<label class="choiceStyle" v-for="(choice, index) in stepChoices" :key="choice">
						<view>
							<radio :value="choice" :checked="index === currentChoice" />
						</view>
						<view>{{choice}}</view>
					</label>
				</radio-group>
				<input class="uni-input" v-model="step.bid" placeholder="下注金额" />
			</view>
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
				stepChoices: data.stepChoices,
				cards: [],
				settingCard: null,
				chosenType: null,
				flopDeck: {
					cards: [],
					bid: []
				},
				steps: [],
				currentChoice: 0,
			}
		},
		onReady() {
			for (let i = 0; i < 3; i++) {
				this.cards.push({
					type: "",
					num: "",
				})
			}
			for (let i = 0; i < 3; i++) {
				this.steps.push({
					choose: 0,
					bid: 0,
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
				this.$set(this.cards, this.settingCard, {
					type: this.chosenType,
					num: num
				})
				this.numListVisible = false
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.stepChoices.length; i++) {
					if (this.stepChoices[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
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
		.choiceStyle {
			display: flex;
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
		.cardNum {
			width: 40px;
			margin: 10px;
			height: 60px;
			text-align: center;
			line-height: 60px;
			border: 1px solid #000;
		}
		.cardNum1,.cardNum12 {
			margin-left: 40px;
			margin-right: 20px;
		}
		.cardNum2,.cardNum13 {
			margin-left: 4px;
			margin-right: 20px;
		}
	}
}
</style>
