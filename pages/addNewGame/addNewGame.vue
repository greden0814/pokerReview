<template>
	<view class="addNewGame">
		<view class="table" :style="'height:'+ windowHeight + 'px;width:' + screenWidth + 'px'">
			<view class="seat" :class="'seat' + player.seat" v-for="player in players" :key="player.seat">
				<view class="cards">
					<view class="card" :class="checkedSeat == '' + player.seat + idx ? 'isChecked' : ''" @click="setCard(player.seat,idx)" v-for="idx in [0,1]" :key="idx">
						{{cardTypes(player.card[idx].type)}}{{player.card[idx].num}}</view>
				</view>
				<input class="chips" v-model="player.chip" type="number" placeholder="筹码数量" maxlength="8" />
				<view class="isBB" v-if="player.seat == bbseat">bb</view>
			</view>
		</view>
		<view class="cardTypeChosen" v-if="typeListVisible">
			<cover-image class="cardType" v-for="item in [0,1,2,3]" :key="item" :src="`../../static/image/${item}.png`"
				@click="choseType(item)"></cover-image>
		</view>
		<view class="cardNumChosen" v-if="numListVisible">
			<view class="cardNum" :class="'cardNum' + card.num + ' ' + card.exile" v-for="card in cardNumList"
				:key="card.num" @click="choseNum(card.num,card.exile)">{{card.num}}</view>
		</view>
		<view class="operationBar">
			<button plain @click="checkMoves">查看记录</button>
			<view style="color: red;font-size: 12px;" v-if="notFinish"> {{warningMsg}} </view>
		</view>
	</view>
</template>

<script>
	import data from "@/static/data/data.js"
	export default {
		data() {
			return {
				bb: 100,
				bbseat: null,
				players: [],
				perflop: [],
				flop: [],
				turn: [],
				river: [],
				compare: [],
				choosingLock: false,
				typeListVisible: false,
				numListVisible: false,
				value: [],
				cardTypes: data.getCardType,
				// cardTypePics: data.cardTypePics,
				cardNumList: null,
				indicatorStyle: `height: 50px;`,
				settingSeat: 0,
				settingCard: 0,
				chosenType: 0,
				checkedSeat: null,

				inputChips: false,
				array: [{
					name: '中国'
				}, {
					name: '美国'
				}, {
					name: '巴西'
				}, {
					name: '日本'
				}],
				index: 2,

				notFinish: true,
				warningMsg: "",

				exileCardList: [
					[],
					[],
					[],
					[]
				],

				windowHeight: 0,
				screenWidth: 0,
			}
		},
		onReady() {
			this.initCardNumList()
			for (let i = 0; i < 9; i++) {
				this.players.push({
					name: "张三",
					seat: i,
					status: "in",
					chip: null,
					card: [{
						type: "",
						num: ""
					}, {
						type: "",
						num: ""
					}],
					// inputChips: false,
				})
			}
			this.windowHeight = wx.getSystemInfoSync().windowHeight
			this.screenWidth = wx.getSystemInfoSync().screenWidth
			// console.log(wx.getSystemInfoSync());
		},
		methods: {
			initCardNumList() {
				this.cardNumList = data.cardNum.map(num => {
					return {
						num,
						exile: ""
					}
				})
			},
			choseType(type) {
				this.typeListVisible = false
				this.numListVisible = true
				this.initCardNumList()
				for (let i = 0; i < this.exileCardList[type].length; i++) {
					this.cardNumList[this.exileCardList[type][i] - 1].exile = "exiled"
				}
				this.chosenType = type
			},
			choseNum(num, exile) {
				if (exile == 'exiled') return
				this.$set(this.players[this.settingSeat].card, this.settingCard, {
					type: this.chosenType,
					num: num
				})
				//设置牌局中被选过的牌
				this.exileCard({
					type: this.chosenType,
					num: num
				})
				this.numListVisible = false
				this.choosingLock = false
				this.checkedSeat = null
			},
			setCard(seat, index) {
				if (this.choosingLock) return
				this.choosingLock = true
				this.typeListVisible = true
				this.checkedSeat = '' + seat + index 
				console.log(this.checkedSeat);
				this.settingSeat = seat
				this.settingCard = index
			},
			exileCard(card) {
				this.exileCardList[card.type].push(card.num)
			},
			checkMoves() {

			},
			goFlop() {
				let playerCounts = 0
				let notFinishMark = 0
				this.players.forEach(p => {
					if (p.card[0].type !== "" && p.card[0].num !== "" && p.card[1].type !== "" && p.card[1].num !==
						"" && p.chip !== null) {
						playerCounts++
					} else if (p.card[0].type === "" && p.card[0].num === "" && p.card[1].type === "" && p.card[1]
						.num === "" && p.chip === null) {} else {
						notFinishMark++
					}
				})
				if (playerCounts < 2) {
					// this.notFinish = true
					this.warningMsg = "牌局人数过少"
					return
				} else if (notFinishMark > 0) {
					// this.notFinish = true
					this.warningMsg = "请补全信息"
					return
				} else {
					this.warningMsg = ""
					// this.notFinish = false
					uni.navigateTo({
						url: `/pages/flopPage/flopPage?num=${playerCounts}`
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.addNewGame {

		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.table {
			// height: 308rpx;
			// width: 750rpx;
			background-image: url("../../static/image/table.png");
			background-size: cover;
			background-repeat: no-repeat;

			.seat {
				// width: 80px;
				height: 70rpx;
				position: absolute;

				.cards {
					display: flex;
					height: 50rpx;

					.card {
						border: 1px solid #000;
						width: 35rpx;
						margin-right: 3rpx;
					}
					
					.isChecked {
						border: 1px solid yellow;
					}
				}

				.chips {
					width: 73rpx;
					font-size: 12rpx;
				}

				.isBB {}
			}

			.seat0 {
				left: 28%;
				top: 20rpx;
			}

			.seat1 {
				right: 37%;
				top: 20rpx;
			}

			.seat2 {
				right: 13%;
				top: 50rpx;
			}

			.seat3 {
				right: 13%;
				bottom: 20rpx;
			}

			.seat4 {
				right: 30%;
				bottom: 6rpx;
			}

			.seat5 {
				left: 43%;
				bottom: 6rpx;
			}

			.seat6 {
				left: 25%;
				bottom: 6rpx;
			}

			.seat7 {
				left: 8%;
				bottom: 20rpx;
			}

			.seat8 {
				left: 8%;
				top: 50rpx;
			}

		}

		.cardTypeChosen {
			position: absolute;
			display: flex;
			width: 400rpx;
			height: 80rpx;
			left: 20%;
			flex-wrap: wrap;
			top: 37%;

			.cardType {
				flex: 1;
				margin: 10px;
			}
		}

		.cardNumChosen {
			position: absolute;
			display: flex;
			width: 400px;
			height: 144px;
			left: calc(50% - 208px);
			flex-wrap: wrap;
			top: calc(50% - 60px);

			.cardNum {
				width: 40px;
				height: 55px;
				margin: 5px;
				text-align: center;
				line-height: 60px;
				border: 1px solid #000;
			}

			.cardNum8 {
				margin-left: 30px;
			}

			.exiled {
				border: none;
				color: transparent;
				cursor: default;
			}
		}

		.operationBar {
			position: absolute;
			right: 10px;
			top: 43%;

			button {
				font-size: 12px;
			}
		}
	}
</style>
